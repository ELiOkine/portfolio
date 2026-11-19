export interface DSMetric {
 label: string;
 value: string;
 description: string;
}

export interface DSDecision {
 decision: string;
 reasoning: string;
}

export interface DSFigure {
 src: string;
 alt: string;
 caption: string;
}

export interface DataScienceProject {
 id: string;
 title: string;
 /** Short card blurb */
 summary: string;
 /** Opening hook for the case study */
 hook: string;
 problem: string;
 businessContext: string;
 /** Permitted data description only */
 dataSource: string;
 approach: string[];
 cleaning?: string[];
 featureEngineering?: string[];
 modeling: string[];
 evaluation: string[];
 findings: string[];
 impact: string;
 challenges: string[];
 lessons: string[];
 techStack: string[];
 metrics: DSMetric[];
 keyDecisions: DSDecision[];
 figures?: DSFigure[];
 role: string;
 /**
 * Honest maturity / disclosure label.
 * 'Public dataset' | 'Academic MVP' | 'Employer project (NDA)' | 'Client project (NDA)'
 */
 stage: 'Public dataset' | 'Academic MVP' | 'Employer project (NDA)' | 'Client project (NDA)';
 stageNote: string;
 domain: 'Forecasting' | 'Anomaly detection' | 'NLP' | 'Supervised ML' | 'Clustering';
 featured: boolean;
 coverImage: string;
 coverAlt: string;
}

/**
 * University of Cambridge Data Science for Business Career Accelerator case studies.
 * Public datasets only. Client and licensed commercial work is not published here.
 */
export const dataScienceProjects: DataScienceProject[] = [
 {
 id: 'marine-engine-anomalies',
 title: 'Marine engine anomaly detection',
 summary:
 'Unsupervised consensus monitoring on ship engine telemetry: IQR, One-Class SVM, and Isolation Forest with tiered risk alerts.',
 hook:
 'No ground truth failure labels. The design problem was how to agree across detectors without inventing precision theater.',
 problem:
 'Flag anomalous engine states early enough to support proactive maintenance instead of waiting for catastrophic failure.',
 businessContext:
 'Marine operators pay for downtime in safety risk and repair cost. Sensor streams exist; labeled failure histories often do not.',
 dataSource:
 'Public IEEE Dataport ship main engine telemetry (Devabrat, 2022): 19,535 rows across six sensors (RPM, lube/fuel/coolant pressures and temperatures).',
 approach: [
 'Multi method unsupervised detection with explicit consensus tiers.',
 'PCA health maps for stakeholder readable visualization.',
 'Parameter choices anchored to a ~3% contamination operating point for ML detectors.',
 ],
 cleaning: [
 'Reported complete integrity on the working extract (no missing or duplicate rows in the analysis set).',
 'Scaled features for OCSVM/PCA; left Isolation Forest on unscaled inputs where appropriate.',
 ],
 featureEngineering: [
 'Used the six raw sensor channels directly for detection.',
 'Derived multi feature IQR logic requiring simultaneous outliers across sensors.',
 ],
 modeling: [
 'Statistical IQR with a ≥2-feature simultaneous outlier rule.',
 'One-Class SVM (RBF, nu≈0.03).',
 'Isolation Forest (contamination≈0.03, 100 estimators).',
 ],
 evaluation: [
 'IQR (≥2 features): 422 anomalies (2.16%).',
 'OCSVM: ~585 (3.00%). Isolation Forest: 587 (3.00%).',
 'Tier 1 critical consensus (all three): 133 samples. Tier 2 ML consensus (OCSVM + IF): 319.',
 'No labeled precision/recall, unsupervised by design.',
 ],
 findings: [
 'Isolation Forest was the practical primary detector for this operating point.',
 'Consensus tiers give operations a severity language without fake accuracy scores.',
 'PCA maps make the alert story explainable to non-ML stakeholders.',
 ],
 impact:
 'A transparent monitoring prototype that separates statistical outliers, ML outliers, and critical multi method agreement.',
 challenges: [
 'Evaluating without labels without overclaiming.',
 'Avoiding alert fatigue from single-method noise.',
 'Keeping the narrative maintenance-oriented rather than purely statistical.',
 ],
 lessons: [
 'Unsupervised work needs operating points and consensus rules, not just model names.',
 'Visual health maps are part of the product, not decoration.',
 'State clearly when precision cannot be computed.',
 ],
 techStack: [
 'Python',
 'scikit-learn',
 'Isolation Forest',
 'One-Class SVM',
 'PCA',
 'matplotlib / seaborn',
 ],
 metrics: [
 {
 label: 'Tier 1 consensus',
 value: '133',
 description: 'Samples flagged by IQR, OCSVM, and Isolation Forest together.',
 },
 {
 label: 'Telemetry rows',
 value: '19,535',
 description: 'Public engine sensor records in the analysis set.',
 },
 {
 label: 'Primary model',
 value: 'IF',
 description: 'Isolation Forest recommended as the day to day detector.',
 },
 ],
 keyDecisions: [
 {
 decision: 'Require multi sensor IQR agreement',
 reasoning:
 'A single sensor spike is noise. Two or more simultaneous outliers better match physical failure modes.',
 },
 {
 decision: 'Publish consensus tiers instead of a single score',
 reasoning:
 'Maintenance teams need severity, not one opaque anomaly probability.',
 },
 {
 decision: 'Refuse fake supervised metrics',
 reasoning:
 'Without labels, accuracy claims would be dishonest. Report rates and agreement instead.',
 },
 ],
 figures: [
 {
 src: '/data-science/marine-engine/figure1_correlation_heatmap.png',
 alt: 'Correlation heatmap of engine sensor features',
 caption: 'Sensor correlation structure used to reason about joint outliers.',
 },
 {
 src: '/data-science/marine-engine/figure4_model_comparison.png',
 alt: 'Comparison of anomaly counts across detection methods',
 caption: 'Anomaly rates across IQR, One-Class SVM, and Isolation Forest.',
 },
 {
 src: '/data-science/marine-engine/figure3_isolation_forest_pca.png',
 alt: 'PCA projection of Isolation Forest anomaly scores',
 caption: 'PCA health map for Isolation Forest detections.',
 },
 ],
 role: 'Data scientist · University of Cambridge accelerator · CAM_C101 Week 5',
 stage: 'Public dataset',
 stageNote: 'Fully publishable. Built on the IEEE Dataport ship engine telemetry set.',
 domain: 'Anomaly detection',
 featured: true,
 coverImage: '/data-science/marine-engine/figure4_model_comparison.png',
 coverAlt: 'Model comparison chart for anomaly detectors',
 },
];

export function getDataScienceProject(id: string) {
 return dataScienceProjects.find((p) => p.id === id);
}

export function getFeaturedDataScienceProjects() {
 return dataScienceProjects.filter((p) => p.featured);
}
