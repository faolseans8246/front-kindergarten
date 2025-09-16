import api from "./axios";
import { unwrap } from "./unwrap";

// Staff
export async function dirCreateStaff(kindergartenId, dto){ return unwrap(await api.post(`/api/director/staff/${kindergartenId}`, dto)); }
export async function dirReassignStaff(userId, kindergartenId){ return unwrap(await api.put(`/api/director/staff/${userId}/assign/${kindergartenId}`)); }
export async function dirUpdateStaff(userId, dto){ return unwrap(await api.put(`/api/director/staff/${userId}`, dto)); }
export async function dirDeleteStaff(userId){ return unwrap(await api.delete(`/api/director/staff/${userId}`)); }
export async function dirBlockStaff(userId){ return unwrap(await api.put(`/api/director/staff/${userId}/block`)); }
export async function dirUnblockStaff(userId){ return unwrap(await api.put(`/api/director/staff/${userId}/unblock`)); }

// Groups
export async function dirCreateGroup(kindergartenId, dto){ return unwrap(await api.post(`/api/director/groups/${kindergartenId}`, dto)); }
export async function dirUpdateGroup(groupId, dto){ return unwrap(await api.put(`/api/director/groups/${groupId}`, dto)); }
export async function dirDeleteGroup(groupId){ return unwrap(await api.delete(`/api/director/groups/${groupId}`)); }
export async function dirAssignTeacher(groupId, teacherId){ return unwrap(await api.put(`/api/director/groups/${groupId}/teacher/${teacherId}`)); }
export async function dirBlockGroup(groupId){ return unwrap(await api.put(`/api/director/groups/${groupId}/block`)); }
export async function dirUnblockGroup(groupId){ return unwrap(await api.put(`/api/director/groups/${groupId}/unblock`)); }

// Children
export async function dirCreateChild(dto){ return unwrap(await api.post(`/api/director/children`, dto)); }
export async function dirUpdateChild(childId, dto){ return unwrap(await api.put(`/api/director/children/${childId}`, dto)); }
export async function dirDeleteChild(childId){ return unwrap(await api.delete(`/api/director/children/${childId}`)); }
export async function dirMoveChild(childId, groupId){ return unwrap(await api.put(`/api/director/children/${childId}/move/${groupId}`)); }
export async function dirBlockChild(childId){ return unwrap(await api.put(`/api/director/children/${childId}/block`)); }
export async function dirUnblockChild(childId){ return unwrap(await api.put(`/api/director/children/${childId}/unblock`)); }

// Status
export async function dirStatusMe(){ return unwrap(await api.get(`/api/director/status/me`)); }
export async function dirStatusKindergarten(id){ return unwrap(await api.get(`/api/director/status/kindergarten/${id}`)); }
export async function dirStatusGroup(id){ return unwrap(await api.get(`/api/director/status/group/${id}`)); }
export async function dirStatusUser(id){ return unwrap(await api.get(`/api/director/status/user/${id}`)); }
export async function dirStatusChild(id){ return unwrap(await api.get(`/api/director/status/child/${id}`)); }
