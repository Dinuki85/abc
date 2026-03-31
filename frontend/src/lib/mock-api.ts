'use client';

export interface MockStudent {
  username: string; // Index Number
  fullName: string;
  grade: string;
  password: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  isFirstLogin: boolean;
  profileCompleted: boolean;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'NEEDS_CORRECTION';
  verificationComment?: string;
  profileData?: {
    address: string;
    parentName: string;
    parentContact: string;
  };
}

const INITIAL_STUDENTS: MockStudent[] = [
  {
    username: 'STU2024001',
    fullName: 'Kamal Perera',
    grade: 'Grade 10',
    password: 'temp123',
    role: 'STUDENT',
    isFirstLogin: true,
    profileCompleted: false,
    verificationStatus: 'PENDING',
  },
  {
    username: 'STU2024002',
    fullName: 'Nimali Silva',
    grade: 'Grade 11',
    password: 'temp123',
    role: 'STUDENT',
    isFirstLogin: false,
    profileCompleted: true,
    verificationStatus: 'VERIFIED',
    profileData: {
      address: '123 Main St, Andiambalama',
      parentName: 'S. Silva',
      parentContact: '0712345678',
    }
  },
  {
    username: 'STAFF001',
    fullName: 'Mr. Sampath',
    grade: 'N/A',
    password: 'staff123',
    role: 'TEACHER',
    isFirstLogin: false,
    profileCompleted: true,
    verificationStatus: 'VERIFIED',
  }
];

class MockApiService {
  private users: MockStudent[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('school_mock_users');
      if (saved) {
        this.users = JSON.parse(saved);
      } else {
        this.users = INITIAL_STUDENTS;
        this.save();
      }
    } else {
      this.users = INITIAL_STUDENTS;
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('school_mock_users', JSON.stringify(this.users));
    }
  }

  login(username: string, password: string): MockStudent | null {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      // Simulate session
      localStorage.setItem('school_current_user', JSON.stringify(user));
      return user;
    }
    return null;
  }

  getCurrentUser(): MockStudent | null {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('school_current_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('school_current_user');
  }

  changePassword(username: string, newPassword: string) {
    const index = this.users.findIndex(u => u.username === username);
    if (index !== -1) {
      this.users[index].password = newPassword;
      this.users[index].isFirstLogin = false;
      this.save();
      // Update session
      localStorage.setItem('school_current_user', JSON.stringify(this.users[index]));
      return true;
    }
    return false;
  }

  updateProfile(username: string, data: NonNullable<MockStudent['profileData']>) {
    const index = this.users.findIndex(u => u.username === username);
    if (index !== -1) {
      this.users[index].profileData = data;
      this.users[index].profileCompleted = true;
      this.users[index].verificationStatus = 'PENDING';
      this.save();
      // Update session
      localStorage.setItem('school_current_user', JSON.stringify(this.users[index]));
      return true;
    }
    return false;
  }

  searchStudent(indexNumber: string): MockStudent | null {
    return this.users.find(u => u.username === indexNumber && u.role === 'STUDENT') || null;
  }

  verifyStudent(username: string, status: MockStudent['verificationStatus'], comment: string = '') {
    const index = this.users.findIndex(u => u.username === username);
    if (index !== -1) {
      this.users[index].verificationStatus = status;
      this.users[index].verificationComment = comment;
      this.save();
      return true;
    }
    return false;
  }
}

export const mockApi = new MockApiService();
