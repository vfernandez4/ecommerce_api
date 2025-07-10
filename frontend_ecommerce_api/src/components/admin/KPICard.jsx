import styles from "./KPICard.module.css";

const KPICardDelta = ({ title, value, delta })  => {
	return (
		<div className={styles.kpiCard}>
			<div className={styles.kpiTitle}>{title}</div>
			<div className={styles.kpiValue}>{value}</div>
			{delta !== undefined && (
				<div className={`${styles.kpiDelta} ${delta >= 0 ? styles.positive : styles.negative}`}>
					{delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}%
				</div>
			)}
		</div>
	)
};

const KPICard = ({ title, value })  => {
	return (
		<div className={styles.kpiCard}>
			<div className={styles.kpiTitle}>{title}</div>
			<div className={styles.kpiValue}>{value}</div>
		</div>
	)
};

export { KPICard, KPICardDelta };