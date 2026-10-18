import { Check } from "lucide-react"
import { MobemMark } from "@/components/ui/mobem-logo"

/** Tâches de la semaine (exemples fictifs, mélange des trois métiers). */
const TASKS = [
  { title: "Relancer la pièce manquante", meta: "Dossier Martin" },
  { title: "Envoyer les convocations", meta: "Session du 14 mars" },
  { title: "Ranger la facture reçue", meta: "Fournisseur télécom" },
  { title: "Prévenir avant l'échéance", meta: "Contrat habitation" },
  { title: "Trier la boîte contact@", meta: "12 nouveaux mails" },
]

/**
 * Visuel du hero : la liste de tâches de la semaine qui se coche toute seule, ligne après ligne.
 * Animation purement CSS, en boucle ; tout est coché d'emblée si l'utilisateur préfère moins d'animations.
 */
export function HeroArtwork() {
  return (
    <div className="art-panel p-4 sm:p-8" aria-hidden="true">
      <div className="hairline overflow-hidden bg-white">
        <div className="flex items-center justify-between border-b border-[#ececef] px-5 py-4">
          <span className="flex items-center gap-2.5">
            <MobemMark className="h-6 w-6 text-ink" />
            <span className="text-[15px] font-[600] text-ink">Cette semaine</span>
          </span>
          <span className="text-[13px] text-[#838385]">sur vos outils</span>
        </div>
        <ul>
          {TASKS.map((task, i) => (
            <li
              key={task.title}
              className="task-row flex items-center gap-4 border-b border-[#f0f0f2] px-5 py-4 last:border-b-0"
              style={{ animationDelay: `${0.8 + i * 1.1}s` } as React.CSSProperties}
            >
              <span className="task-box flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px]">
                <Check className="task-tick h-4 w-4 text-white" strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="task-title block truncate text-[15px] font-[550]">{task.title}</span>
                <span className="block truncate text-[13px] text-[#838385]">{task.meta}</span>
              </span>
              <span className="task-status relative text-right text-[12px] font-[600]">
                <span className="task-todo">À faire</span>
                <span className="task-done absolute inset-0 text-blue">Fait</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
