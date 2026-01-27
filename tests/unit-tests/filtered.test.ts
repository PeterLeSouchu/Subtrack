import { MensualityGetType } from '@/src/types/mensuality';
import { filtered } from '../../src/utils/filtered';
import { describe, it, expect } from 'vitest';

const mensualities: MensualityGetType[] = [
  { id: '1', name: 'Abonnement Netflix', price: "15", category: { id: 'streaming', name: 'Streaming', image: "image" } },
  { id: '2', name: 'Spotify Premium', price: "10", category: { id: 'music', name: 'Music', image: "image" } },
  { id: '3', name: 'Gym', price: "30", category: { id: 'fitness', name: 'Fitness', image: "image" } },
];

describe('filtered', () => {
  it('should return all mensualities if selectedCategory is "all" and searchValue is empty', () => {
    const result = filtered(mensualities, '', 'all') ?? [];
    expect(result).toHaveLength(3);
  });

  it('should filter by category', () => {
    const result = filtered(mensualities, '', 'music') ?? [];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Spotify Premium');
  });

  it('should filter by search value (name)', () => {
    const result = filtered(mensualities, 'netflix', 'all') ?? [];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Abonnement Netflix');
  });

  it('should filter by search value (price)', () => {
    const result = filtered(mensualities, '30', 'all') ?? [];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gym');
  });

  it('should filter by search value (category name)', () => {
    const result = filtered(mensualities, 'fitness', 'all') ?? [];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gym');
  });

  it('should return empty array if nothing matches', () => {
    const result = filtered(mensualities, 'nonexistent', 'all') ?? [];
    expect(result).toHaveLength(0);
  });

  it('should return empty array if mensualities is undefined', () => {
    const result = filtered(undefined, '', 'all') ?? [];
    expect(result).toEqual([]);
  });
});
