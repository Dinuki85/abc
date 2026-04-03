'use client';

const API_BASE_URL = 'http://localhost:8091/api';

export interface User {
  id: number;
  username: string;
  role: 'ROLE_STUDENT' | 'ROLE_TEACHER' | 'ROLE_ADMIN' | 'ROLE_STAFF';
  firstLogin: boolean;
}

export interface StudentProfile {
  id?: number;
  username: string;
  fullName: string;
  initials: string;
  nameWithInitials: string;
  dob: string;
  gender: string;
  religion: string;
  nationality?: string;
  birthCertificateNumber?: string;
  nic?: string;
  address?: string;
  bloodGroup?: string;
  medicalHistory?: string;
  guardianName?: string;
  guardianNic?: string;
  guardianContact?: string;
  gradeId?: number;
  classId?: number;
  gradeName?: string;
  className?: string;
  profileCompleted?: boolean;
  verificationStatus?: string;
  verificationComment?: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  name: string;
  user: User;
}

class ApiService {
  private getHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {};
    const auth = localStorage.getItem('school_auth');
    const headers: any = { 'Content-Type': 'application/json' };
    if (auth) headers['Authorization'] = `Basic ${auth}`;
    return headers;
  }

  async login(username: string, password: string): Promise<User | null> {
    const auth = btoa(`${username}:${password}`);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('school_auth', auth);
        localStorage.setItem('school_user', JSON.stringify(user));
        return user;
      }
      
      const errorText = await response.text();
      console.error('Login failed with status:', response.status, 'Error:', errorText);
      return null;
    } catch (error) {
      console.error('Network or parsing error during login:', error);
      return null;
    }
  }

  async getStudentProfile(username: string): Promise<StudentProfile | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/student/${username}`, {
        headers: this.getHeaders()
      });
      if (response.ok) return await response.json();
      return null;
    } catch (error) {
      return null;
    }
  }

  async saveStudentProfile(username: string, profile: StudentProfile) {
    const response = await fetch(`${API_BASE_URL}/student/profile?username=${username}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      console.error('Profile save failed:', errorMsg);
      throw new Error(errorMsg || 'Failed to save profile');
    }
    return response.json();
  }

  async assignStudent(username: string, gradeId: number, classId: number) {
    const response = await fetch(`${API_BASE_URL}/admin/assign-student`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, gradeId, classId })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async assignTeacher(teacherId: number, classId: number) {
    const response = await fetch(`${API_BASE_URL}/admin/assign-teacher`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ teacherId, classId })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async assignTeacherToGrade(teacherId: number, gradeId: number) {
    const response = await fetch(`${API_BASE_URL}/admin/assign-teacher-grade`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ teacherId, gradeId })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async enrollStudent(data: { username: string, password: string, gradeId: number, classId: number }) {
    const response = await fetch(`${API_BASE_URL}/admin/enroll-student`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async getGrades(): Promise<Grade[]> {
    const response = await fetch(`${API_BASE_URL}/admin/grades`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getClasses(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/classes`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async createClass(gradeId: number, className: string) {
    const response = await fetch(`${API_BASE_URL}/admin/classes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ gradeId, className })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async createTeacher(name: string, username: string, password: string, designation?: string) {
    const response = await fetch(`${API_BASE_URL}/admin/create-teacher`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, username, password, designation })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async updateTeacher(id: number, name: string, designation: string) {
    const response = await fetch(`${API_BASE_URL}/admin/teachers/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, designation })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async deleteTeacher(id: number) {
    const response = await fetch(`${API_BASE_URL}/admin/teachers/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async getTeachers(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/teachers`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getTeacherOverview(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/admin/teachers/overview`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return null;
  }

  async getClassesByGrade(gradeId: number): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/classes?gradeId=${gradeId}`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getStudents(): Promise<StudentProfile[]> {
    const response = await fetch(`${API_BASE_URL}/admin/students?all=true`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getPaginatedStudents(page: number, size: number, searchTerm?: string, gradeId?: number | '', classId?: number | ''): Promise<any> {
    let url = `${API_BASE_URL}/admin/students?page=${page}&size=${size}`;
    if (searchTerm) url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    if (gradeId !== '' && gradeId !== undefined) url += `&gradeId=${gradeId}`;
    if (classId !== '' && classId !== undefined) url += `&classId=${classId}`;
    
    const response = await fetch(url, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return { content: [], totalElements: 0, totalPages: 0 };
  }

  async getAdminStats(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return null;
  }

  async getUnassignedStudents(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/unassigned-students`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getMyClass() {
    const response = await fetch(`${API_BASE_URL}/teacher/my-class`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
  }

  async getMyGrade() {
    const response = await fetch(`${API_BASE_URL}/teacher/my-grade`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
  }

  async getStudentsByClass(classId: number) {
    const response = await fetch(`${API_BASE_URL}/teacher/students/${classId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  }

  async getStudentsByGrade(gradeId: number) {
    const response = await fetch(`${API_BASE_URL}/teacher/grade-students/${gradeId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch students by grade');
    return response.json();
  }

  async getTeacherClassesByGrade(gradeId: number) {
    const response = await fetch(`${API_BASE_URL}/teacher/classes/${gradeId}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) return [];
    return response.json();
  }

  async searchStudent(username: string): Promise<StudentProfile | null> {
    const response = await fetch(`${API_BASE_URL}/teacher/student/${username}`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return null;
  }

  async verifyStudent(studentId: number, status: string, comment: string) {
    const response = await fetch(`${API_BASE_URL}/teacher/verify`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ studentId, status, comment })
    });
    if (!response.ok) throw new Error(await response.text());
    return true;
  }

  async changePassword(username: string, newPassword: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newPassword })
    });
    if (response.ok) {
      // Update local storage user if needed
      const user = this.getCurrentUser();
      if (user && user.username === username) {
        user.firstLogin = false;
        localStorage.setItem('school_user', JSON.stringify(user));
        // Update credentials for Basic Auth
        const newAuth = btoa(`${username}:${newPassword}`);
        localStorage.setItem('school_auth', newAuth);
      }
      return true;
    }
    return false;
  }

  async getStaffProfile(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/staff/me`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return null;
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('school_user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('school_auth');
    localStorage.removeItem('school_user');
  }
}

export const api = new ApiService();
