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
 * NDA safe: client names omitted where required; no proprietary datasets shipped.
 */
export const dataScienceProjects: DataScienceProject[] = [
 {
 id: 'parts-demand-forecasting',
 title: 'Intermittent spare parts demand forecasting',
 summary:
 'Employer project under NDA: forecasting sparse monthly demand across thousands of SKUs for a large automotive parts distributor in Latin America.',
 hook:
 'On the first SKU level run, seasonal naive beat Prophet and a foundation model. The useful work was diagnosing why, then redesigning the problem around intermittency and SKU tiers.',
 problem:
 'Build a demand-forecasting approach for genuine spare parts so inventory and commercial risk can be managed when most SKU months are zero and history is uneven.',
 businessContext:
 'A regional automotive parts distributor faces supplier concentration, currency exposure, and aftermarket price pressure. Collision and bodywork parts remain a relatively defensible OEM segment, but planning is hard when demand is intermittent and long tailed.',
 dataSource:
 'Confidential multi year monthly sales panel (~950k rows, ~19k SKUs). Raw data, client identity, and absolute financials are withheld under NDA. Charts below use relative metrics only.',
 approach: [
 'Exploratory analysis of sparsity, missingness, and demand patterns (smooth, erratic, intermittent, lumpy).',
 'SKU tiering so modeling effort follows volume concentration rather than treating every part equally.',
 'Benchmark classical forecasting (Prophet) against a time series foundation model (Amazon Chronos-2, zero shot and LoRA) and a seasonal naive baseline under a holdout backtest.',
 ],
 cleaning: [
 'Documented heavy zero inflation (~72% of SKU months) and large missingness in revenue, stock, and product tags.',
 'Scoped modeling to shared, evaluable SKU sets rather than forcing forecasts on empty history.',
 ],
 featureEngineering: [
 'Demand pattern features and history length segments to explain where each model family wins or fails.',
 'Macro and calendar context reviewed; several macro fields were empty and excluded rather than imputed blindly.',
 ],
 modeling: [
 'Prophet for interpretable trend and seasonality.',
 'Chronos-2 zero shot and LoRA fine-tuning on Kaggle GPU.',
 'Seasonal naive baseline treated as a first class competitor, not a footnote.',
 ],
 evaluation: [
 'Early top-SKU run used sMAPE and showed naive competitive or better at SKU grain.',
 'Later shared ~8k-SKU run used RMSSE; Chronos-2 mean RMSSE ~0.68 (beats naive at < 1.0); Prophet near ~1.0.',
 'LoRA added little over zero shot on this panel (~1% of SKUs improved), which informed the final recommendation.',
 ],
 findings: [
 'Intermittent spare parts demand punishes models that ignore zeros; baselines matter.',
 'Foundation models can beat naive when the problem is scoped and metric choice matches intermittency.',
 'Aggregate or tier level forecasts are often more actionable than naive SKU everywhere ambition.',
 ],
 impact:
 'Delivered a reproducible forecasting strategy, EDA pack, and model comparison that the team could defend to non-technical stakeholders without overselling SKU level certainty.',
 challenges: [
 'Extreme sparsity and missing commercial fields.',
 'Choosing metrics that do not reward trivial zero forecasts.',
 'Keeping client confidentiality while still publishing transferable methods.',
 ],
 lessons: [
 'Publish the loss to the baseline. It builds more trust than a cherry-picked win.',
 'Tier the catalog before you chase model complexity.',
 'Foundation models help most after the data problem is framed correctly.',
 ],
 techStack: [
 'Python',
 'pandas',
 'Prophet',
 'Amazon Chronos-2',
 'PyTorch',
 'LoRA',
 'Kaggle GPU',
 'RMSSE / sMAPE',
 ],
 metrics: [
 {
 label: 'Chronos-2 RMSSE',
 value: '~0.68',
 description: 'Mean RMSSE on the shared SKU run (below 1.0 beats seasonal naive).',
 },
 {
 label: 'Panel scale',
 value: '~19k SKUs',
 description: 'Multi year monthly panel with heavy zero inflation.',
 },
 {
 label: 'LoRA lift',
 value: '~1%',
 description: 'Share of SKUs improved by LoRA over zero shot, limited on this data.',
 },
 ],
 keyDecisions: [
 {
 decision: 'Treat seasonal naive as a real competitor',
 reasoning:
 'On intermittent demand, sophisticated models often lose. A baseline first design forced honest diagnosis instead of metric theater.',
 },
 {
 decision: 'Tier SKUs by volume contribution',
 reasoning:
 'A few dozen strategic parts carried most volume. Equal effort across 19k SKUs would have diluted impact.',
 },
 {
 decision: 'Prefer RMSSE for the shared evaluation',
 reasoning:
 'RMSSE scales errors relative to naive and handles intermittency more fairly than raw sMAPE alone.',
 },
 ],
 figures: [
 {
 src: '/data-science/parts-forecast/rmsse_comparison.svg',
 alt: 'Bar chart of mean RMSSE for Chronos-2, Prophet, and seasonal naive',
 caption: 'Shared SKU run: Chronos-2 beats the seasonal naive baseline on mean RMSSE. Client anonymized.',
 },
 ],
 role: 'Data scientist · University of Cambridge Data Science for Business Career Accelerator employer project',
 stage: 'Employer project (NDA)',
 stageNote:
 'Client name, raw data, and absolute financials withheld. Methods and relative metrics only.',
 domain: 'Forecasting',
 featured: true,
 coverImage: '/data-science/parts-forecast/rmsse_comparison.svg',
 coverAlt: 'RMSSE model comparison chart',
 },
 {
 id: 'book-sales-forecasting',
 title: 'Hybrid forecasting for retail book sales',
 summary:
 'Classical, tree based, deep learning, and hybrid models competing on weekly BookScan style series with a 32-week holdout.',
 hook:
 'The winning system was not the deepest network. A parallel SARIMA and LSTM blend cut Title B test MAPE to 18.0%.',
 problem:
 'Forecast weekly demand for two perennial titles far enough ahead to support print run and inventory planning.',
 businessContext:
 'Publisher and retail intelligence teams need forward demand for steady sellers whose sales still move with seasonality, promotions, and long memory.',
 dataSource:
 'Licensed weekly retail book sales panel (Nielsen BookScan class). Raw series are not redistributed here. Reported test MAPE figures come from the project evaluation tables.',
 approach: [
 'Decomposition, ACF/PACF, and stationarity tests (ADF + KPSS) to establish seasonal structure (lag-52).',
 'Progressive modeling: SARIMA → XGBoost → LSTM → sequential and parallel hybrids.',
 'Hold out the final 32 weeks for test; compare MAPE across families honestly.',
 ],
 cleaning: [
 'Filtered long history titles with sufficient post 2012 weekly observations.',
 'Aligned calendar features and avoided leakage from future windows into training folds.',
 ],
 featureEngineering: [
 'Lag features and calendar channels for tree and neural models.',
 'Seasonal difference structure for SARIMA via Auto-ARIMA search.',
 ],
 modeling: [
 'SARIMA via Auto-ARIMA (Title A: ARIMA(0,1,2)(1,1,1)[52]; Title B: ARIMA(1,1,0)(1,1,0)[52]).',
 'XGBoost with time series cross-validation and grid search.',
 'LSTM with KerasTuner multi output 32-week forecasts.',
 'Sequential hybrid (SARIMA residuals → LSTM) and parallel weighted blend with weight sweep.',
 ],
 evaluation: [
 'SARIMA MAPE: 21.5% / 22.6% (Title A / Title B).',
 'XGBoost: 30.5% / 26.8%. LSTM: 49.6% / 22.0%.',
 'Best overall: parallel hybrid. 22.8% (Title A, SARIMA weight 0.80) and 18.0% (Title B, weight 0.40).',
 ],
 findings: [
 'Title B was more forecastable; hybrid weighting helped most where LSTM already tracked seasonality.',
 'Pure LSTM overfit Title A; classical structure still mattered.',
 'Monthly aggregation changed the ranking. Grain choice is a product decision, not only a modeling one.',
 ],
 impact:
 'Produced a defensible model ladder and clear recommendation for when hybrids beat either parent model alone.',
 challenges: [
 'Small effective sample once weekly series are filtered to active titles.',
 'Preventing optimistic leakage in multi output neural forecasts.',
 'Communicating MAPE trade-offs without overselling print run certainty.',
 ],
 lessons: [
 'Always keep a strong classical baseline next to deep models.',
 'Hybrid weights should be swept, not assumed 50/50.',
 'Report losses by title. Averages hide which series the model actually serves.',
 ],
 techStack: [
 'Python',
 'statsmodels / Auto-ARIMA',
 'XGBoost',
 'TensorFlow / Keras',
 'KerasTuner',
 'scikit-learn',
 'MAPE',
 ],
 metrics: [
 {
 label: 'Best MAPE',
 value: '18.0%',
 description: 'Parallel hybrid on Title B, 32-week test window.',
 },
 {
 label: 'Model families',
 value: '4+',
 description: 'SARIMA, XGBoost, LSTM, sequential and parallel hybrids.',
 },
 {
 label: 'Horizon',
 value: '32 weeks',
 description: 'Fixed holdout used for every family.',
 },
 ],
 keyDecisions: [
 {
 decision: 'Compare hybrids against every parent model',
 reasoning:
 'A hybrid only earns its complexity if it beats both SARIMA and LSTM on the same fold.',
 },
 {
 decision: 'Sweep parallel blend weights',
 reasoning:
 'Optimal SARIMA weight differed by title (0.80 vs 0.40), proving one blend does not fit all series.',
 },
 {
 decision: 'Keep weekly grain for the primary ladder',
 reasoning:
 'Monthly aggregation inflated some errors and obscured seasonal structure the business actually plans against.',
 },
 ],
 figures: [
 {
 src: '/data-science/book-forecast/mape_comparison.svg',
 alt: 'Grouped bar chart of test MAPE by model for two book titles',
 caption: 'Test MAPE by model. Parallel hybrid wins overall; Title B reaches 18.0%.',
 },
 ],
 role: 'Data scientist · University of Cambridge accelerator · CAM_DS_C301 Weeks 9 and 10',
 stage: 'Academic MVP',
 stageNote: 'University of Cambridge accelerator topic project. Licensed source data not redistributed.',
 domain: 'Forecasting',
 featured: true,
 coverImage: '/data-science/book-forecast/mape_comparison.svg',
 coverAlt: 'MAPE comparison across forecasting models',
 },
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
 {
 id: 'fitness-sentiment-topics',
 title: 'Neural topic modelling of member sentiment',
 summary:
 'Client project under NDA: BERTopic, emotion classification, and a generative LLM to turn negative reviews into operational themes.',
 hook:
 'Overcrowding showed up everywhere. The sharper cancellation driver was how staff handled service failures.',
 problem:
 'Identify the true drivers behind negative member sentiment so operations can reduce churn related cancellations.',
 businessContext:
 'A UK fitness chain (client anonymized under NDA) needed more than star ratings: which failure modes create anger, which create resignation, and which are operationally fixable.',
 dataSource:
 'Confidential 12 month review corpora from major public review platforms. Raw text and client identity are withheld. Insights below are generalized.',
 approach: [
 'NLP preprocessing and frequency baselines.',
 'BERTopic with MiniLM embeddings, UMAP, and HDBSCAN; LDA retained as a classical check.',
 'Transformer emotion classification plus a 7B instruct model for recommendation drafting on GPU.',
 ],
 cleaning: [
 'Focused analysis on low star reviews where cancellation risk concentrates.',
 'Merged multi platform negatives carefully to avoid double counting branch themes.',
 ],
 featureEngineering: [
 'Embedding based topic representations rather than bag of words alone.',
 'Location level cuts (including high traffic branches) to separate systemic vs site specific issues.',
 ],
 modeling: [
 'BERTopic (all-MiniLM-L6-v2) for neural topics.',
 'Hugging Face emotion classifier for affect tagging.',
 'Falcon-7B instruct for strategy language generation after local M1 limits forced a Colab T4 path.',
 'Gensim LDA (10 topics) as interpretability baseline.',
 ],
 evaluation: [
 'Qualitative topic coherence vs LDA; BERTopic produced sharper operational themes.',
 'Emotion distributions separated hygiene (sadness leaning) from billing/communication (anger leaning).',
 'No single accuracy number, unsupervised discovery by design.',
 ],
 findings: [
 'Capacity pressure is common; service recovery quality separates recoverable friction from cancellation triggers.',
 'Billing and atmosphere themes were statistically separable, so they need different owners.',
 'Generative recommendations only helped after topics were grounded in evidence.',
 ],
 impact:
 'Gave operations a theme map and prioritized interventions (peak hour coverage, capacity visibility, empathetic billing journeys) without exposing client data publicly.',
 challenges: [
 'GPU memory limits on local hardware for 7B generation.',
 'Keeping NDA boundaries while still showing transferable NLP skill.',
 'Preventing topic models from collapsing into generic “bad service” buckets.',
 ],
 lessons: [
 'Neural topics need a classical baseline so stakeholders trust the jump in clarity.',
 'Emotion tags add operational language that topic labels alone lack.',
 'If the model cannot run locally, document the cloud path. That is part of the engineering.',
 ],
 techStack: [
 'Python',
 'BERTopic',
 'UMAP / HDBSCAN',
 'sentence transformers',
 'Hugging Face Transformers',
 'Falcon-7B',
 'Gensim LDA',
 'Google Colab',
 ],
 metrics: [
 {
 label: 'Review window',
 value: '12 mo',
 description: 'Negative review focus across major platforms (count withheld).',
 },
 {
 label: 'Topic stack',
 value: 'Neural + LDA',
 description: 'BERTopic primary; LDA retained as validation baseline.',
 },
 {
 label: 'Disclosure',
 value: 'NDA',
 description: 'Client name and raw reviews not published.',
 },
 ],
 keyDecisions: [
 {
 decision: 'Lead with BERTopic, keep LDA',
 reasoning:
 'Stakeholders needed both sharper clusters and a familiar baseline to trust the newer method.',
 },
 {
 decision: 'Separate emotion from topic',
 reasoning:
 'The same facility issue can feel like sadness or anger; operations respond differently.',
 },
 {
 decision: 'Anonymize the public case study',
 reasoning:
 'The mutual NDA restricts naming the client and sharing confidential review content.',
 },
 ],
 role: 'Data scientist · University of Cambridge accelerator · CAM_C301 Weeks 4 and 5',
 stage: 'Client project (NDA)',
 stageNote:
 'Client identity and review text withheld under mutual NDA. Methods and generalized findings only.',
 domain: 'NLP',
 featured: true,
 coverImage: '/data-science/sentiment-topics/pipeline.svg',
 coverAlt: 'Illustrative NLP pipeline from reviews to topics, emotion, and recommendations',
 },
];

export function getDataScienceProject(id: string) {
 return dataScienceProjects.find((p) => p.id === id);
}

export function getFeaturedDataScienceProjects() {
 return dataScienceProjects.filter((p) => p.featured);
}
