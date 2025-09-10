import css from "./FormTitle.module.css";

export default function FormTitle() {
  return (
    <div className={css.container}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
    </div>
  );
}
