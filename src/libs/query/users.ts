import { pick } from 'lodash';

import { Event, User } from '@/libs/models';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getMembers = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user/all-users`);
  const { success, data, message } = await res.json();
  if (!success) throw new Error(message as string);
  const refactorData = data.map((item: any) => ({
    _id: item.id,
    name: item.profile ? item.profile.fullName : '',
    email: item.email,
    gen: item.profile ? item.profile.gen : '',
    departments: item.profile ? item.profile.departments.join(', ') : '', // join array to string
    facebook: item.profile ? item.profile.facebook : '',
  }));
  return refactorData;
};

const getUserByID = async (id: string) => {
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user?id=${id}`);
  const { success, data, message } = await res.json();
  if (!success) throw new Error(message as string);
  return data;
};

const updateInfo = async (id: string, data: User) => {
  const request = {
    id,
    data: {
      profile: {
        ...pick(data.profile, [
          'fullName',
          'phone',
          'studentID',
          'gen',
          'school',
          'dob',
          'departments',
          'position',
          'facebook',
        ]),
      },
    },
  };
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user/information-update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { success, message } = await res.json();
  if (!success) throw new Error(message as string);
};

const deleteUser = async (id: number) => {
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/user/users-remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: [id] }),
  });
  const { success, data, message } = await res.json();
  if (!success || data.count === 0) throw new Error(message);
};

const createEvent = async (data: Event) => {
  const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/event/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const { success, message } = await res.json();
  if (!success) throw new Error(message as string);
};

export default function useUsers() {
  return {
    getMembers,
    getUserByID,
    updateInfo,
    deleteUser,
    createEvent,
  };
}
