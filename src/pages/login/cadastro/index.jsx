import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Heart,
  HeartHandshake,
  Lock,
  Mail,
  MapPin,
  PawPrint,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

export default function LoginCadastro({ onNavigate }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLogin = mode === "login";

  return (
    <section className="auth-page standalone-page">
      <div className="auth-panel">
        <div className="auth-copy">
          <span>
            <Heart size={14} fill="currentColor" />
            MiAUmigos Match
          </span>
          <h1>{isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}</h1>
          <p>
            {isLogin
              ? "Entre para continuar com segurança e ver pets compatíveis com sua rotina."
              : "Crie sua conta e descubra pets que combinam com seu lar e seu coração."}
          </p>

          <div className="auth-benefits">
            <span>
              <CheckCircle2 size={18} />
              Compatibilidade baseada na sua rotina
            </span>
            <span>
              <CheckCircle2 size={18} />
              Pets ideais para seu estilo de vida
            </span>
            <span>
              <CheckCircle2 size={18} />
              Contato direto com ONGs e protetores
            </span>
          </div>

          <div className="auth-pet-visual">
            <img src="/gatoecachorro-imagem.png" alt="Cachorro feliz para adoção" />
            <div>
              <Heart size={18} fill="currentColor" />
              <strong>Encontre um amigo. </strong>
              <small>Transforme uma vida.</small>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={(event) => event.preventDefault()}>
          <div className="auth-tabs" aria-label="Alternar login e cadastro">
            <button className={isLogin ? "active" : ""} type="button" onClick={() => setMode("login")}>
              <Mail size={16} />
              Login
            </button>
            <button className={!isLogin ? "active" : ""} type="button" onClick={() => setMode("cadastro")}>
              <UserPlus size={16} />
              Criar conta
            </button>
          </div>

          {!isLogin && (
            <label>
              Nome completo
              <span className="auth-field">
                <User size={16} />
                <input placeholder="Seu nome completo" />
              </span>
            </label>
          )}

          <label>
            E-mail
            <span className="auth-field">
              <Mail size={16} />
              <input type="email" placeholder="exemplo@email.com" />
            </span>
          </label>

          <label>
            Senha
            <span className="auth-field">
              <Lock size={16} />
              <input type={showPassword ? "text" : "password"} placeholder="********" />
              <button
                className="auth-eye-button"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <Eye size={16} />
              </button>
            </span>
          </label>

          {!isLogin && (
            <>
              <label>
                Confirme sua senha
                <span className="auth-field">
                  <Lock size={16} />
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="********" />
                  <button
                    className="auth-eye-button"
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                  >
                    <Eye size={16} />
                  </button>
                </span>
              </label>

              <label>
                Cidade
                <span className="auth-field">
                  <MapPin size={16} />
                  <input placeholder="Recife, Olinda, Jaboatão..." />
                </span>
              </label>
            </>
          )}

          {isLogin && (
            <div className="auth-options">
              <label>
                <input type="checkbox" defaultChecked />
                Lembrar de mim
              </label>
              <button type="button">Esqueci minha senha</button>
            </div>
          )}

          <button className="primary-action auth-submit" type="button" onClick={() => onNavigate("match")}>
            <PawPrint size={17} />
            {isLogin ? "Encontrar meu match" : "Criar conta e encontrar meu match"}
            <ArrowRight size={17} />
          </button>

          <button className="auth-demo-link" type="button" onClick={() => onNavigate("match")}>
            <HeartHandshake size={17} />
            Experimentar demonstração
          </button>

          <p className="auth-safe-note">
            <ShieldCheck size={15} />
            Seus dados estão protegidos e seguros com a gente.
          </p>
        </form>
      </div>
    </section>
  );
}
