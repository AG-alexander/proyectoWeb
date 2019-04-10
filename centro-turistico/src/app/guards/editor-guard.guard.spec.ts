import { TestBed, async, inject } from '@angular/core/testing';

import { EditorGuardGuard } from './editor-guard.guard';

describe('EditorGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorGuardGuard]
    });
  });

  it('should ...', inject([EditorGuardGuard], (guard: EditorGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
