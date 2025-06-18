import { TestBed } from '@angular/core/testing';

import { FirebaseDatasource } from './firebase-datasource';

describe('FirebaseDataSource', () => {
  let service: FirebaseDatasource<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDatasource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
