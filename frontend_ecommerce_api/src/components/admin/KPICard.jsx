import styles from "./KPICard.module.css";

const KPICard = ({ title, value, delta })  => {
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

export default KPICard;