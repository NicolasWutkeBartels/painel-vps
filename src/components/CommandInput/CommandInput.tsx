import styles from "./CommandInput.module.css";

export function CommandInput({ hostname }: { hostname?: string }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.prompt} aria-hidden="true">
        container@{hostname ?? "vps"} ~ $
      </span>
      <label htmlFor="cmd" className={styles.srOnly}>
        Comando
      </label>
      <input id="cmd" type="text" readOnly placeholder="Digite um comando…" className={styles.input} />
    </div>
  );
}
