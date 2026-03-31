'use client';

export interface Grade {
  id: number;
  name: string;
}

export interface Class {
  id: number;
  name: string;
  gradeId: number;
}

export interface MockStudent {
  username: string; // Index Number
  fullName: string;
  grade: string; // Keep for legacy/compat
  password: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  isFirstLogin: boolean;
  profileCompleted: boolean;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'NEEDS_CORRECTION';
  verificationComment?: string;
  gradeId?: number | null;
  classId?: number | null;
  profileData?: {
    address: string;
    parentName: string;
    parentContact: string;
  };
}

const GRADES: Grade[] = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: `Grade ${i + 1}`,
}));

const CLASSES: Class[] = GRADES.flatMap(g => 
  ["A", "B", "C"].map((name, i) => ({
    id: g.id * 10 + i,
    name,
    gradeId: g.id
  }))
);

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
    gradeId: null,
    classId: null
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
    gradeId: 2, // Grade 10
    classId: 3, // A
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
      const saved = localStorage.getItem('school_mock_users_v2');
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
      localStorage.setItem('school_mock_users_v2', JSON.stringify(this.users));
    }
  }

  getGrades(): Grade[] {
    return GRADES;
  }

  getClassesByGrade(gradeId: number): Class[] {
    return CLASSES.filter(c => c.gradeId === gradeId);
  }

  getGradeName(id?: number | null): string {
    return GRADES.find(g => g.id === id)?.name || 'Not Assigned';
  }

  getClassName(id?: number | null): string {
    return CLASSES.find(c => c.id === id)?.name || 'Not Assigned';
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

  assignClass(username: string, gradeId: number, classId: number) {
    const index = this.users.findIndex(u => u.username === username);
    if (index !== -1) {
      this.users[index].gradeId = gradeId;
      this.users[index].classId = classId;
      this.save();
      return true;
    }
    return false;
  }

  getStudentsByClass(classId: number): MockStudent[] {
    return this.users.filter(u => u.classId === classId && u.role === 'STUDENT');
  }

  getUnassignedStudents(): MockStudent[] {
    return this.users.filter(u => u.role === 'STUDENT' && u.profileCompleted && !u.gradeId);
  }

  getPendingVerificationStudents(): MockStudent[] {
    return this.users.filter(u => u.role === 'STUDENT' && u.profileCompleted && u.gradeId && u.verificationStatus === 'PENDING');
  }
}

export const mockApi = new MockApiService();

