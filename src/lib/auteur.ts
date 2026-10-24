export const estAuteur = (): boolean => import.meta.env.DEV || location.hash === "#tableau";
