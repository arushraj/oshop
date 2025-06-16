import { TestBed } from '@angular/core/testing';

import { FirebaseAuthentication } from './firebase-authentication';

describe('FirebaseAuthentication', () => {
  let service: FirebaseAuthentication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAuthentication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
