'use client';

const API_BASE_URL = 'http://localhost:8091/api';

export interface User {
  id: number;
  username: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'STAFF';
  firstLogin: boolean;
}

export interface StudentProfile {
  username: string;
  address: string;
  parentName: string;
  parentContact: string;
  profileCompleted: boolean;
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
    if (!auth) return { 'Content-Type': 'application/json' };
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    };
  }

  async login(username: string, password: string): Promise<User | null> {
    const auth = btoa(`${username}:${password}`);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('school_auth', auth);
        localStorage.setItem('school_user', JSON.stringify(user));
        return user;
      }
      return null;
    } catch (error) {
      console.error('Login failed', error);
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

  async getTeachers(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/teachers`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getUnassignedStudents(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/admin/unassigned-students`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
  }

  async getStudentsByClass(classId: number): Promise<StudentProfile[]> {
    const response = await fetch(`${API_BASE_URL}/teacher/students/${classId}`, {
      headers: this.getHeaders()
    });
    if (response.ok) return await response.json();
    return [];
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
