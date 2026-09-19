export const tracks = [
  {
    id: 'fondations',
    num: 1,
    title: 'Fondations',
    icon: '🌱',
    desc: 'Comprendre pourquoi le commerce est honoré en Islam et cultiver le caractère du commerçant de confiance.',
    color: 'emerald',
  },
  {
    id: 'fiqh',
    num: 2,
    title: 'Fiqh des transactions',
    icon: '📜',
    desc: 'La science du licite et de l’illicite : riba, contrats, ventes et partenariats selon la loi islamique.',
    color: 'gold',
  },
  {
    id: 'gestion',
    num: 3,
    title: 'Lancer & gérer',
    icon: '🔧',
    desc: 'De l’idée au lancement : financer, tenir les comptes, fixer les prix et vendre sans compromettre ses principes.',
    color: 'emerald',
  },
  {
    id: 'patrimoine',
    num: 4,
    title: 'Commerce moderne & patrimoine',
    icon: '🌍',
    desc: 'E-commerce, chaîne d’approvisionnement halal, investissement conforme et transmission de votre richesse.',
    color: 'gold',
  },
]

export function getTrack(id) {
  return tracks.find((t) => t.id === id)
}