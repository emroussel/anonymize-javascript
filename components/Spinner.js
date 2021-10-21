import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <span
      className={`inline-block w-6 h-6 rounded-full text-white ${styles.container}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};
