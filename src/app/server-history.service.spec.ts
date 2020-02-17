import { TestBed } from '@angular/core/testing';

import { ServerHistoryService } from './server-history.service';

describe('ServerHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerHistoryService = TestBed.get(ServerHistoryService);
    expect(service).toBeTruthy();
  });
});
