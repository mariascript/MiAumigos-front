import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Home,
  MapPin,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { pets } from "../Home/data";

const questions = [
  {
    label: "Tipo de moradia",
    name: "homeType",
    options: ["Apartamento", "Casa", "Casa com quintal", "Sítio ou chácara"],
  },
  {
    label: "Espaço disponível",
    name: "space",
    options: ["Pequeno", "Médio", "Grande"],
  },
  {
    label: "Tempo livre por dia",
    name: "time",
    options: ["Até 30 minutos", "1 hora", "2 horas ou mais"],
  },
  {
    label: "Personalidade que combina com você",
    name: "personality",
    options: ["Calmo", "Brincalhão", "Independente", "Carinhoso"],
  },
  {
    label: "Experiência com animais",
    name: "experience",
    options: ["Primeira adoção", "Já tive pets", "Tenho pets hoje"],
  },
];

const introBenefits = [
  "Compatibilidade com sua rotina",
  "Pets ideais para seu espaço",
  "Recomendações personalizadas",
  "Matches mais compatíveis com você",
  "Processo simples e acolhedor",
];

const matchPets = pets.slice(0, 3).map((pet, index) => ({
  ...pet,
  score: [96, 91, 87][index],
  reason: [
    "Combina com rotina ativa, espaço médio e vontade de criar vínculo rápido.",
    "Perfil calmo para quem quer companhia tranquila e adaptação gradual.",
    "Ótimo match para quem busca carinho, rotina leve e presença no dia a dia.",
  ][index],
}));

export default function Match({ onNavigate }) {
  const [stage, setStage] = useState("profile");
  const [profile, setProfile] = useState({
    homeType: "Apartamento",
    space: "Médio",
    time: "1 hora",
    personality: "Carinhoso",
    experience: "Já tive pets",
  });

  const updateProfile = (name, value) => {
    setProfile((current) => ({ ...current, [name]: value }));
  };

  if (stage === "results") {
    return <MatchResults profile={profile} onNavigate={onNavigate} onRestart={() => setStage("profile")} />;
  }

  return (
    <section className={`match-page standalone-page match-page-${stage}`}>
      <div className="match-intro">
        <div>
          <span>
            <Sparkles size={18} />
            Match MiAUmigos
          </span>
          <h1>Encontre seu novo melhor amigo</h1>
          <p>
            Responda algumas perguntas e descubra pets que combinam com sua rotina e seu jeito de viver.
          </p>
          <ul className="match-benefits">
            {introBenefits.map((benefit) => (
              <li key={benefit}>
                <CheckCircle2 size={18} />
                {benefit}
              </li>
            ))}
          </ul>
          {stage === "intro" && (
            <button className="primary-action" onClick={() => setStage("profile")}>
              <PawPrint size={17} />
              Iniciar Match
            </button>
          )}
        </div>
      </div>

      {stage === "profile" && (
        <form className="match-form" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span>Seu perfil de adoção</span>
            <h2>Monte seu perfil de adoção</h2>
            <p>Conte sobre sua rotina e preferências para recomendarmos pets compatíveis com você.</p>
          </div>

          <div className="match-question-grid">
            {questions.map((question) => (
              <label key={question.name}>
                {question.label}
                <select
                  value={profile[question.name]}
                  onChange={(event) => updateProfile(question.name, event.target.value)}
                >
                  {question.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <button className="primary-action match-submit" type="button" onClick={() => setStage("results")}>
            Ver pets compatíveis
            <ArrowRight size={17} />
          </button>
        </form>
      )}
    </section>
  );
}

function MatchResults({ profile, onNavigate, onRestart }) {
  return (
    <section className="match-page standalone-page">
      <div className="match-hero">
        <div>
          <span>
            <Sparkles size={17} />
            Resultado do match
          </span>
          <h1>Pets compatíveis com você</h1>
          <p>
            Cruzamos moradia, espaço, tempo livre, personalidade e experiência
            para sugerir pets com mais chance de adaptação.
          </p>
        </div>
        <button className="secondary-action" onClick={onRestart}>
          Ajustar respostas
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="match-layout">
        <aside className="match-profile">
          <h2>Seu perfil</h2>
          <div>
            <span>
              <Home size={17} />
              {profile.homeType} · espaço {profile.space.toLowerCase()}
            </span>
            <span>
              <MapPin size={17} />
              Recife e região
            </span>
            <span>
              <Heart size={17} />
              {profile.personality} · {profile.time}
            </span>
            <span>
              <PawPrint size={17} />
              {profile.experience}
            </span>
          </div>
          <button className="primary-action" onClick={() => onNavigate("adoption")}>
            Iniciar formulário
          </button>
        </aside>

        <div className="match-results">
          {matchPets.map((pet) => (
            <article className="match-card" key={pet.name}>
              <img src={pet.image} alt={pet.name} />
              <div className="match-card-body">
                <div className="match-score">
                  <strong>{pet.score}%</strong>
                  <span>compatível</span>
                </div>
                <h3>{pet.name}</h3>
                <p>{pet.reason}</p>
                <div className="match-tags">
                  <span>{pet.city}</span>
                  <span>{pet.age}</span>
                  <span>{pet.size}</span>
                </div>
                <button className="secondary-action">
                  <CheckCircle2 size={17} />
                  Quero conhecer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}