"use client"

import styles from './index.module.css'


type Participant = {
id: string;
name: string;
status: "arrived" | "time";
time?: string; 
};


const participants: Participant[] = [
{ id: "1", name: "hsmt", status: "time", time: "00:12" },
{ id: "2", name: "やの", status: "time", time: "00:03" },
{ id: "3", name: "橋本", status: "arrived" },
{ id: "4", name: "はると", status: "arrived" },
];


export default function ArrivalStatus() {
return (
<div className={styles.container}>
<main className={styles.cardWrap}>
<section className={styles.header}>
<div className={styles.label}>集合場所</div>
<h2 className={styles.location}>ECCコンピュータ専門学校</h2>
<div className={styles.ruleLine} />


<div className={styles.label}>集合時間</div>
<div className={styles.time}>12:00</div>
<div className={styles.ruleLine} />


<button type="button" className={styles.notifyBtn}>全員集合できた！！</button>
</section>


<section className={styles.participantsCard}>
<div className={styles.participantsHeader}>参加者</div>


<ul className={styles.participantList}>
{participants.map((p) => (
<li key={p.id} className={styles.participantRow}>
<div className={styles.name}>{p.name}</div>
<div className={styles.statusWrap}>
{p.status === "arrived" ? (
<span className={`${styles.pill} ${styles.pillArrived}`}>到着</span>
) : (
<span className={`${styles.pill} ${styles.pillTime}`}>{p.time}</span>
)}
</div>
</li>
))}
</ul>
</section>
</main>
</div>
);
}