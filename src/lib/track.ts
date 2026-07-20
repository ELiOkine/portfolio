export const TRACK_STORAGE_KEY = 'eo-portfolio-track';

export type PortfolioTrack = 'software' | 'data';

/** Accurate credential: accelerator affiliated with University of Cambridge via Fourth Rev. Not a degree. */
export const cambridgeCredential = {
 short: 'University of Cambridge',
 program: 'Data Science for Business Career Accelerator',
 withPartner: 'University of Cambridge · Data Science for Business Career Accelerator',
 full: 'University of Cambridge Data Science for Business Career Accelerator (Fourth Rev)',
} as const;
