import { useMemo, useState } from "react";
import {
  CalendarDays,
  Cat,
  ChevronDown,
  Dog,
  Heart,
  MapPin,
  PawPrint,
  SlidersHorizontal,
  VenusAndMars,
} from "lucide-react";
import { pets } from "../Home/data";

export default function Encontrar({ searchTerm, onSearch, onSelectPet }) {
  const [filters, setFilters] = useState({
    type: "Todos",
    species: "Todas",
    size: "Todos",
    age: "Todas",
    sex: "Todos",
    city: "Todas",
  });

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        !normalizedSearch ||
        [pet.name, pet.type, pet.species, pet.breed, pet.city, pet.size, pet.age, pet.sex, ...pet.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesFilters =
        (filters.type === "Todos" || pet.type === filters.type) &&
        (filters.species === "Todas" || pet.species === filters.species || pet.breed === filters.species) &&
        (filters.size === "Todos" || pet.size === filters.size) &&
        (filters.age === "Todas" || pet.age === filters.age) &&
        (filters.sex === "Todos" || pet.sex === filters.sex) &&
        (filters.city === "Todas" || pet.city === filters.city);

      return matchesSearch && matchesFilters;
    });
  }, [filters, normalizedSearch]);

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <section className="find-page">
      <div className="find-hero">
        <div>
          <h1>
            Encontre o seu novo <strong>melhor amigo</strong>
          </h1>
          <p>Conheça os pets disponíveis para adoção e transforme uma vida.</p>
        </div>
      </div>

      <div className="filters-panel">
        <FilterSelect icon={PawPrint} label="Espécie" value={filters.type} onChange={(value) => updateFilter("type", value)} options={["Todos", "Cachorro", "Gato", "Filhote"]} />
        <FilterSelect icon={Cat} label="Raça" value={filters.species} onChange={(value) => updateFilter("species", value)} options={["Todas", "SRD", "Golden", "Labrador", "Pastor", "Pinscher", "Vira-lata"]} />
        <FilterSelect icon={Dog} label="Porte" value={filters.size} onChange={(value) => updateFilter("size", value)} options={["Todos", "Pequeno", "Médio", "Grande"]} />
        <FilterSelect icon={CalendarDays} label="Idade" value={filters.age} onChange={(value) => updateFilter("age", value)} options={["Todas", "3 meses", "5 meses", "6 meses", "7 meses", "8 meses", "1 ano", "2 anos"]} />
        <FilterSelect icon={VenusAndMars} label="Sexo" value={filters.sex} onChange={(value) => updateFilter("sex", value)} options={["Todos", "Macho", "Fêmea"]} />
        <FilterSelect icon={MapPin} label="Cidade" value={filters.city} onChange={(value) => updateFilter("city", value)} options={["Todas", "Recife", "Olinda", "Camaragibe", "Paulista", "Jaboatão"]} />
        <FilterSelect icon={SlidersHorizontal} label="Mais filtros" value="Todos" onChange={() => {}} options={["Todos", "Vacinado", "Castrado", "Filhote"]} />
      </div>

      <div className="results-row find-results-row">
        <p>
          <strong>{filteredPets.length}</strong> pets encontrados
        </p>
        <label>
          Ordenar por:
          <select defaultValue="recentes">
            <option value="recentes">Mais recentes</option>
            <option value="nome">Nome</option>
            <option value="cidade">Cidade</option>
          </select>
        </label>
      </div>

      {normalizedSearch && (
        <button className="clear-search" onClick={() => onSearch("")}>
          Limpar busca por "{searchTerm}"
        </button>
      )}

      <div className="find-grid">
        {filteredPets.map((pet) => (
          <FindPetCard key={pet.id} pet={pet} onSelect={() => onSelectPet(pet)} />
        ))}
      </div>
    </section>
  );
}

function FilterSelect({ icon: Icon, label, value, options, onChange }) {
  return (
    <label className="filter-select">
      <Icon size={16} />
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={14} />
    </label>
  );
}

function FindPetCard({ pet, onSelect }) {
  return (
    <article className="find-pet-card">
      <button className="find-pet-open" onClick={onSelect} aria-label={`Ver detalhes de ${pet.name}`}>
        <span>{pet.badge}</span>
        <img src={pet.image} alt={`${pet.name}, ${pet.type} para adoção`} />
        <Heart className="find-favorite" size={17} />
        <div>
          <h3>{pet.name}</h3>
          <p>
            {pet.age} • {pet.sex} • {pet.size}
          </p>
          <small>{pet.city}, PE</small>
        </div>
      </button>
    </article>
  );
}
