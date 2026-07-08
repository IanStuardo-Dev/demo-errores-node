const {
  normalizeInspectorName,
  buildInspectionCard,
  filterReadyForRelease,
  sortByScoreDesc,
  countByStatus,
  createInspectionScorer,
  calculateAverageScore,
  enrichWithRiskLevel
} = require('../src/shared/javascript/inspection-analytics');

const inspections = [
  {
    id: 1,
    productId: 1,
    inspector: 'Ana Quality',
    score: 92,
    status: 'approved',
    notes: 'Packaging and switches are consistent'
  },
  {
    id: 2,
    productId: 1,
    inspector: 'Luis QA',
    score: 64,
    status: 'rework',
    notes: 'One stabilizer needs adjustment'
  },
  {
    id: 3,
    productId: 2,
    inspector: 'Mia Control',
    score: 88,
    status: 'approved',
    notes: 'Sensor calibration looks good'
  },
  {
    id: 4,
    productId: 2,
    inspector: 'Ravi Audit',
    score: 81,
    status: 'rejected',
    notes: 'Missing serial number on packaging'
  }
];

describe('JavaScript inspection analytics', () => {
  test('normalizeInspectorName should trim, collapse spaces and uppercase the name', () => {
    expect(normalizeInspectorName('  ana   quality  ')).toBe('ANA QUALITY');
  });

  test('buildInspectionCard should return an object from an arrow function', () => {
    const card = buildInspectionCard(inspections[0]);

    expect(card).toEqual({
      id: 1,
      title: 'Ana Quality - approved',
      needsAttention: false
    });
  });

  test('filterReadyForRelease should return only approved inspections with score >= 85', () => {
    const readyInspections = filterReadyForRelease(inspections);

    expect(readyInspections.map((inspection) => inspection.id)).toEqual([1, 3]);
  });

  test('sortByScoreDesc should sort by score from highest to lowest without mutating input', () => {
    const sorted = sortByScoreDesc(inspections);

    expect(sorted.map((inspection) => inspection.score)).toEqual([92, 88, 81, 64]);
    expect(inspections.map((inspection) => inspection.id)).toEqual([1, 2, 3, 4]);
  });

  test('countByStatus should count every inspection grouped by status', () => {
    const counts = countByStatus([
      ...inspections,
      {
        id: 5,
        productId: 3,
        inspector: 'Nora Audit',
        score: 73,
        status: 'rework',
        notes: 'Loose cable needs review'
      }
    ]);

    expect(counts).toEqual({
      approved: 2,
      rework: 2,
      rejected: 1
    });
  });

  test('createInspectionScorer should use the configured passing score', () => {
    const scorer = createInspectionScorer(85);

    expect(scorer.isPassing({ score: 92 })).toBe(true);
    expect(scorer.isPassing({ score: 81 })).toBe(false);
  });

  test('calculateAverageScore should divide the total score by the number of inspections', () => {
    expect(calculateAverageScore(inspections)).toBe(81.25);
  });

  test('enrichWithRiskLevel should resolve all async mapped inspections', async () => {
    const enrichedInspections = await enrichWithRiskLevel(inspections);

    expect(enrichedInspections).toEqual([
      expect.objectContaining({ id: 1, riskLevel: 'low' }),
      expect.objectContaining({ id: 2, riskLevel: 'high' }),
      expect.objectContaining({ id: 3, riskLevel: 'low' }),
      expect.objectContaining({ id: 4, riskLevel: 'medium' })
    ]);
  });
});
