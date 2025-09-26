/**
 * Test data generator for loading test credentials from JSON file
 */

import * as fs from 'fs';
import * as path from 'path';

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  acceptMarketing: boolean;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export class TestDataGenerator {
  private static testCredentials: any = null;

  /**
   * Load test credentials from JSON file
   */
  private static loadTestCredentials(): any {
    if (!this.testCredentials) {
      try {
        const credentialsPath = path.join(__dirname, '../data/test-credentials.json');
        const credentialsData = fs.readFileSync(credentialsPath, 'utf8');
        this.testCredentials = JSON.parse(credentialsData);
      } catch (error) {
        console.error('Error loading test credentials:', error);
        throw new Error('Failed to load test credentials');
      }
    }
    return this.testCredentials;
  }

  /**
   * Get test user data from credentials file
   */
  public static getTestUser(): UserRegistrationData {
    const credentials = this.loadTestCredentials();
    return credentials.testUser;
  }

  /**
   * Get wrong password for negative testing
   */
  public static getWrongPassword(): string {
    const credentials = this.loadTestCredentials();
    return credentials.wrongPassword;
  }

  /**
   * Generate login credentials from test user data
   */
  public static getLoginData(): UserLoginData {
    const testUser = this.getTestUser();
    return {
      email: testUser.email,
      password: testUser.password
    };
  }

  /**
   * Generate login data with wrong password (for negative testing)
   */
  public static getLoginDataWithWrongPassword(): UserLoginData {
    const testUser = this.getTestUser();
    return {
      email: testUser.email,
      password: this.getWrongPassword()
    };
  }
}