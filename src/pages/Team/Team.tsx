import TeamGrid from "../../components/TeamGrid/TeamGrid";
import "./Team.css";

export default function Team() {
  return (
    <section className="team">
      <h2 className="team__title">Mi equipo</h2>
      <TeamGrid />
    </section>
  );
}
