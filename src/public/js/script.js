const colors = [
  '#3B82F6',
  '#6B7280',
  '#EC4899',
  '#8B5CF6',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#6366F1',

  '#374151',
  '#B91C1C',
  '#B45309',
  '#047857',
  '#1D4ED8',
  '#4338CA',
  '#6D28D9',
  '#BE185D',

  '#D1D5DB',
  '#FCA5A5',
  '#FCD34D',
  '#6EE7B7',
  '#93C5FD',
  '#A5B4FC',
  '#C4B5FD',
  '#F9A8D4',
]

categories = Object.keys(chartData)
amounts = Object.values(chartData)
backgroundColor = colors.slice(0, categories.length)
console.log({ categories, amounts, backgroundColor })

const chart = new Chart(document.getElementById('chart'), {
  type: 'doughnut',
  data: {
    labels: categories,
    datasets: [
      {
        label: 'My First Dataset',
        data: amounts,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
        cutout: '60%',
        borderWidth: 0,
      },
    ],
  },
})
