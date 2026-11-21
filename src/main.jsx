import { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import {
  ArrowLeftIcon, EyeIcon, EyeSlashIcon,
  LockKeyIcon, MailboxIcon, ShieldCheckIcon,
} from '@phosphor-icons/react';
import { auth, callbackUrl, canRecover, completeCallback, finishRecovery } from './auth.js';
import logo from './assets/logo.png';
import formspic from './assets/formspic.png';
import { ProfilePage } from './profile/ProfilePage';
import { AppShell } from './app/layouts/AppShell';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { EventsDiscoverPage } from './features/events/EventsDiscoverPage';
import { EventDetailPage } from './features/events/EventDetailPage';
import { EventsMyPage } from './features/events/EventsMyPage';
import { EventsAgendaPage } from './features/events/EventsAgendaPage';
import { MatchingPage } from './features/events/MatchingPage';
import { BusinessCardPage } from './features/networking/BusinessCardPage';
import { NetworkPage } from './features/networking/NetworkPage';
import { MessagesPage } from './features/messaging/MessagesPage';
import { MeetingsPage } from './features/meetings/MeetingsPage';
import { CompanyPage } from './features/company/CompanyPage';
import { CompanyCollaboratorsPage } from './features/company/CompanyCollaboratorsPage';
import { CompanyInvitationsPage } from './features/company/CompanyInvitationsPage';
import { CompanyTokensPage } from './features/company/CompanyTokensPage';
import { OrganizerEventsPage } from './features/organizer/OrganizerEventsPage';
import { OrganizerParticipantsPage } from './features/organizer/OrganizerParticipantsPage';
import { OrganizerProgramPage } from './features/organizer/OrganizerProgramPage';
import { OrganizerAttendancePage } from './features/organizer/OrganizerAttendancePage';
import { OrganizerStatisticsPage } from './features/organizer/OrganizerStatisticsPage';
import { AdminUsersPage, AdminEventsPage, AdminSubscriptionsPage, AdminStatisticsPage } from './features/administration/AdminPages';
import { SettingsAccountPage, SettingsPrivacyPage, SettingsNotificationsPage } from './features/settings/SettingsPages';

const screens = {
  login: {
    title: 'Bon retour.',
    description: 'Connectez-vous à votre espace Nexus.',
    action: 'Se connecter',
  },
  register: {
    title: 'Créez votre compte.',
    description: 'Rejoignez Nexus pour retrouver vos événements et vos contacts.',
    action: 'Créer mon compte',
  },
  forgot: {
    title: 'Mot de passe oublié ?',
    description: 'Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.',
    action: 'Envoyer le lien',
  },
  reset: {
    title: 'Nouveau mot de passe',
    description: 'Choisissez un mot de passe pour retrouver l’accès à votre compte.',
    action: 'Enregistrer le mot de passe',
  },
};

const errors = {
  invalid_credentials: 'L’adresse e-mail ou le mot de passe est incorrect.',
  email_not_confirmed: 'Veuillez confirmer votre adresse e-mail avant de vous connecter.',
  weak_password: 'Choisissez un mot de passe plus fort.',
  same_password: 'Choisissez un mot de passe différent de l’ancien.',
  over_email_send_rate_limit: 'Trop de demandes. Attendez un instant avant de réessayer.',
  over_request_rate_limit: 'Trop de demandes. Attendez un instant avant de réessayer.',
  provider_disabled: 'La connexion avec Google est actuellement indisponible.',
  auth_unconfigured: 'L’authentification n’est pas encore configurée sur cette instance.',
};

function messageFor(error) {
  return errors[error?.code || error?.message]
    || 'Une erreur est survenue. Veuillez réessayer.';
}

function Brand() {
  return (
    <Link className="brand" to="/login">
      <img src={logo.src} alt="Nexus — Accueil" />
    </Link>
  );
}

function Layout({ children }) {
  const { pathname } = useLocation();
  const content = useRef(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) content.current?.focus();
    previousPath.current = pathname;
  }, [pathname]);

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <section className="auth-form">
          <div className="side-header"><Brand /></div>
          <main className="auth-content" ref={content} tabIndex={-1}>
            <div className="auth-form-frame" key={pathname}>{children ?? <Outlet />}</div>
          </main>
          <footer className="auth-footer">
            <ShieldCheckIcon size={16} aria-hidden="true" /> Espace privé Nexus
          </footer>
        </section>
        <aside className="auth-visual">
          <img src={formspic.src} alt="Nexus Platform. Rencontres professionnelles, événements et rendez-vous." />
        </aside>
      </div>
    </div>
  );
}

function Heading({ title, description, icon: Icon }) {
  useEffect(() => {
    document.title = title + ' | Nexus';
  }, [title]);

  return (
    <header className="form-heading">
      {Icon && <div className="heading-icon"><Icon aria-hidden="true" size={23} /></div>}
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" width="19" height="19">
      <path fill="#4285F4" d="M43.6 24.46c0-1.36-.12-2.66-.35-3.92H24v7.43h11a9.4 9.4 0 0 1-4.08 6.18v5.14h6.62c3.87-3.57 6.06-8.82 6.06-14.83Z" />
      <path fill="#34A853" d="M24 44c5.4 0 9.93-1.79 13.24-4.85l-6.62-5.14a12 12 0 0 1-17.88-6.28H5.91v5.3A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.74 27.73a12 12 0 0 1 0-7.46v-5.3H5.91a20 20 0 0 0 0 18.06Z" />
      <path fill="#EA4335" d="M24 11.92c2.94 0 5.57 1 7.66 3l5.75-5.75A19.2 19.2 0 0 0 24 4a20 20 0 0 0-18.09 10.97l6.83 5.3A11.93 11.93 0 0 1 24 11.92Z" />
    </svg>
  );
}

function PasswordField({ id = 'password', label, autocomplete, minLength, hint, extra, required = true }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <div className="password-wrap">
        <input id={id} name={id} type={visible ? 'text' : 'password'} autoComplete={autocomplete}
          required={required} minLength={minLength} aria-describedby={hint ? id + '-hint' : undefined}
          placeholder="••••••••" />
        <button className="password-toggle" type="button" aria-controls={id}
          aria-label={(visible ? 'Masquer' : 'Afficher') + ' ' + label.toLowerCase()}
          onClick={() => setVisible(!visible)}>
          {visible ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
      {hint && <small id={id + '-hint'}>{hint}</small>}
    </div>
  );
}

function Feedback({ text }) {
  return text && <p className="feedback" role="alert">{text}</p>;
}

function BackToLogin() {
  return (
    <Link to="/login" className="back-link">
      <ArrowLeftIcon size={16} aria-hidden="true" /> Retour à la connexion
    </Link>
  );
}

function AuthForm({ mode, onSession, onEnterPreview }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(null);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';
  const isPreviewLogin = isLogin && Boolean(onEnterPreview);
  const screen = screens[mode];

  async function run(action, job) {
    setError('');
    setPending(action);
    try {
      if (!auth) throw new Error('auth_unconfigured');
      await job();
    } catch (failure) {
      setError(messageFor(failure));
    } finally {
      setPending(null);
    }
  }

  function signInWithGoogle() {
    void run('google', async () => {
      const { error: failure } = await auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callbackUrl(), queryParams: { prompt: 'select_account' } },
      });
      if (failure) throw failure;
    });
  }

  async function submit(event) {
    event.preventDefault();
    if (isPreviewLogin) {
      onEnterPreview();
      navigate('/dashboard', { replace: true });
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.trim();
    const password = data.get('password');
    const name = data.get('name')?.trim();
    const form = event.currentTarget;
    setError('');
    if (isRegister && !name) {
      setError('Saisissez votre nom complet.');
      form.elements.namedItem('name').focus();
      return;
    }
    if (isReset && password !== data.get('confirmation')) {
      setError('Les deux mots de passe doivent être identiques.');
      form.elements.namedItem('confirmation').focus();
      return;
    }

    await run('form', async () => {
      if (isForgot) {
        const { error: failure } = await auth.resetPasswordForEmail(email, { redirectTo: callbackUrl(true) });
        if (failure && failure.code !== 'user_not_found') throw failure;
        setSent(true);
        return;
      }

      if (isReset) {
        const { error: failure } = await auth.updateUser({ password });
        if (failure) throw failure;
        finishRecovery();
        navigate('/dashboard', { replace: true, state: { passwordUpdated: true } });
        return;
      }

      const result = isRegister
        ? await auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: callbackUrl() } })
        : await auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      if (!result.data.session) {
        if (isLogin) throw new Error('missing_session');
        setSent(true);
        return;
      }

      finishRecovery();
      onSession(result.data.session);
      navigate('/dashboard', { replace: true });
    });
  }

  if (sent) {
    return (
      <>
        <Heading icon={MailboxIcon} title="Vérifiez votre boîte mail"
          description={isForgot
            ? 'Si un compte correspond à cette adresse, vous recevrez un lien de réinitialisation.'
            : 'Si l’inscription peut être confirmée, vous recevrez un lien par e-mail pour activer votre compte.'} />
        <BackToLogin />
      </>
    );
  }

  return (
    <>
      <Heading title={screen.title}
        description={isPreviewLogin ? 'Accédez à la démo Nexus sans identifiants.' : screen.description}
        icon={isForgot || isReset ? LockKeyIcon : null} />
      {(isLogin || isRegister) && (
        <>
          <button className="google-button" type="button" onClick={signInWithGoogle} disabled={Boolean(pending)}>
            <GoogleMark /> {pending === 'google' ? 'Connexion en cours…' : 'Continuer avec Google'}
          </button>
          <div className="divider"><span>ou par e-mail</span></div>
        </>
      )}
      <form onSubmit={submit} noValidate={isPreviewLogin}>
        {isRegister && (
          <div className="field">
            <label htmlFor="name">Nom complet</label>
            <input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="Votre nom complet" />
          </div>
        )}
        {!isReset && (
          <div className="field">
            <label htmlFor="email">Adresse e-mail</label>
            <input id="email" name="email" type="email" autoComplete={isLogin ? 'username' : 'email'}
              required={!isPreviewLogin} placeholder="vous@exemple.com" />
          </div>
        )}
        {!isForgot && (
          <PasswordField label={isReset ? 'Nouveau mot de passe' : 'Mot de passe'}
            autocomplete={isLogin ? 'current-password' : 'new-password'}
            required={!isPreviewLogin}
            minLength={isLogin ? undefined : 8} hint={isLogin ? null : '8 caractères minimum.'}
            extra={isLogin && <Link to="/forgot-password" className="field-link">Mot de passe oublié ?</Link>} />
        )}
        {isReset && <PasswordField id="confirmation" label="Confirmation du mot de passe" autocomplete="new-password" />}
        <Feedback text={error} />
        {(isLogin || isForgot) && !error && <Feedback text={location.state?.callbackError} />}
        <button className="primary-button" type="submit" disabled={Boolean(pending)}>
          {pending === 'form' ? 'Veuillez patienter…' : screen.action}
        </button>
      </form>
      {isLogin && <p className="form-bottom">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>}
      {isRegister && <p className="form-bottom">Déjà un compte ? <Link to="/login">Se connecter</Link></p>}
      {(isForgot || isReset) && <BackToLogin />}
    </>
  );
}

function Callback({ recovery, onSession }) {
  const navigate = useNavigate();
  const exchange = useRef(null);

  useEffect(() => {
    exchange.current ??= completeCallback(recovery);
    let active = true;
    exchange.current.then((session) => {
      if (!active) return;
      onSession(session);
      navigate(recovery ? '/reset-password' : '/dashboard', { replace: true });
    }).catch(() => {
      if (!active) return;
      navigate(recovery ? '/forgot-password' : '/login', {
        replace: true,
        state: { callbackError: 'Ce lien est invalide ou a expiré. Veuillez réessayer.' },
      });
    });
    return () => { active = false; };
  }, [recovery, navigate, onSession]);

  return <Heading title="Vérification en cours" description="Nous vérifions votre lien Nexus." />;
}

function App() {
  const [session, setSession] = useState(auth ? undefined : null);
  const [previewAccess, setPreviewAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!auth) return undefined;
    const { data } = auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_OUT') finishRecovery();
      setSession(currentSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  function enterPreview() {
    setPreviewAccess(true);
  }

  function exitPreview() {
    setPreviewAccess(false);
  }

  const hasAppAccess = Boolean(session) || previewAccess;

  if (session === undefined && !location.pathname.startsWith('/auth/')) {
    return <Layout><Heading title="Chargement…" description="Nous vérifions votre session." /></Layout>;
  }

  const recovering = canRecover(session);
  const signedInDestination = recovering ? '/reset-password' : '/dashboard';
  const protectedRoute = hasAppAccess && !recovering
    ? <AppShell onPreviewSignOut={previewAccess ? exitPreview : undefined}><Outlet /></AppShell>
    : <Navigate to={recovering ? '/reset-password' : '/login'} replace />;
  const login = <AuthForm mode="login" onSession={setSession} onEnterPreview={auth ? undefined : enterPreview} />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth/callback" element={<Callback key="callback" onSession={setSession} />} />
        <Route path="/auth/recovery" element={<Callback key="recovery" recovery onSession={setSession} />} />
        <Route path="/login" element={session ? <Navigate to={signedInDestination} replace /> : login} />
        <Route path="/register" element={session ? <Navigate to={signedInDestination} replace /> : <AuthForm mode="register" onSession={setSession} />} />
        <Route path="/forgot-password" element={<AuthForm mode="forgot" />} />
        <Route path="/reset-password" element={recovering ? <AuthForm mode="reset" /> : <Navigate to="/forgot-password" replace state={{ callbackError: 'Demandez un nouveau lien pour réinitialiser votre mot de passe.' }} />} />
      </Route>
      <Route element={protectedRoute}>
        <Route path="/account" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/business-card" element={<BusinessCardPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/events/discover" element={<EventsDiscoverPage />} />
        <Route path="/events/my" element={<EventsMyPage />} />
        <Route path="/events/agenda" element={<EventsAgendaPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/collaborators" element={<CompanyCollaboratorsPage />} />
        <Route path="/company/invitations" element={<CompanyInvitationsPage />} />
        <Route path="/company/tokens" element={<CompanyTokensPage />} />
        <Route path="/organizer/events" element={<OrganizerEventsPage />} />
        <Route path="/organizer/participants" element={<OrganizerParticipantsPage />} />
        <Route path="/organizer/program" element={<OrganizerProgramPage />} />
        <Route path="/organizer/attendance" element={<OrganizerAttendancePage />} />
        <Route path="/organizer/statistics" element={<OrganizerStatisticsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/events" element={<AdminEventsPage />} />
        <Route path="/admin/subscriptions" element={<AdminSubscriptionsPage />} />
        <Route path="/admin/statistics" element={<AdminStatisticsPage />} />
        <Route path="/settings/account" element={<SettingsAccountPage />} />
        <Route path="/settings/privacy" element={<SettingsPrivacyPage />} />
        <Route path="/settings/notifications" element={<SettingsNotificationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={session ? signedInDestination : '/login'} replace />} />
    </Routes>
  );
}

export default function NexusApp() {
  // Keep auth state changes and guarded redirects at the same update priority.
  return <BrowserRouter useTransitions={false}><App /></BrowserRouter>;
}
