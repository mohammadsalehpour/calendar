import { PadZero, PercentToMinute, DiffMinutes, IsDateBetween, IsSameDay, UUID } from './utility';

describe('PadZero', () => {
  it('should pad single-digit numbers with a zero', () => {
    expect(PadZero(5)).toBe('05');
  });

  it('should not pad double-digit numbers', () => {
    expect(PadZero(15)).toBe('15');
  });
});

describe('PercentToMinute', () => {
  it('should return 60 for a percentage of 100', () => {
    expect(PercentToMinute(100)).toBe(60);
  });
});

describe('DiffMinutes', () => {
  it('should calculate the difference between two dates in minutes', () => {
    const date1 = new Date('2022-01-01T00:00:00');
    const date2 = new Date('2022-01-01T01:00:00');
    expect(DiffMinutes(date1, date2)).toBe(60);
  });

  it('should return 0 for the same date and time', () => {
    const date = new Date('2022-01-01T00:00:00');
    expect(DiffMinutes(date, date)).toBe(0);
  });
});

describe('IsDateBetween', () => {
  it('should return true if a date is between two other dates', () => {
    const date = new Date('2022-01-02');
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-03');
    expect(IsDateBetween(date, startDate, endDate)).toBe(true);
  });

  it('should return false if a date is not between two other dates', () => {
    const date = new Date('2022-01-04');
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-03');
    expect(IsDateBetween(date, startDate, endDate)).toBe(false);
  });
});

describe('IsSameDay', () => {
  it('should return true if two dates are on the same day', () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-01');
    expect(IsSameDay(date1, date2)).toBe(true);
  });

  it('should return false if two dates are not on the same day', () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-02');
    expect(IsSameDay(date1, date2)).toBe(false);
  });
});

describe('UUID', () => {
  it('should generate a UUID with 4 parts by default', () => {
    const uuid = UUID();
    expect(uuid.split('-').length).toBe(4);
  });

  it('should generate a UUID with the specific number of parts', () => {
    const parts = 6;
    const uuid = UUID(parts);
    expect(uuid.split('-').length).toBe(parts);
  });

    it('should generate a unique UUID', () => {
        const uuid1 = UUID();
        const uuid2 = UUID();
        expect(uuid1).not.toBe(uuid2);
  });
});
