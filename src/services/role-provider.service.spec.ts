/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleProviderService } from './role-provider.service';

describe('Service: RoleProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleProviderService]
    });
  });

  it('should ...', inject([RoleProviderService], (service: RoleProviderService) => {
    expect(service).toBeTruthy();
  }));
});
