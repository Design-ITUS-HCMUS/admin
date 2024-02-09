import { STATUS_CODE } from '@/utils/enum';
import BaseResponse from '@/utils/baseResponse';
import RoleRepository from '@repositories/roleRepository';
import { Role } from '@/interfaces/role';

class RoleService {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }

  async createRole(data: Role) {
    try {
      const { name } = data;
      const existedRole = await this.repository.getByEntity({ name });
      if (existedRole) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Role already exists');
      }
      const role = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Role created successfully', role);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getRoleById(id: number) {
    try {
      const role = await this.repository.getByEntity({ id });
      if (!role) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Role not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Role found', role);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getAllRoles() {
    try {
      const roles = await this.repository.getAll();
      return new BaseResponse(STATUS_CODE.OK, true, 'Get all roles successfully', roles);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async updateRole(id: number, data: Role) {
    try {
      const role = await this.repository.getByEntity({ id });
      if (!role) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Role not found');
      }
      const currentUsers = role.users.map((user) => ({ id: user.id }));
      const updatedRole = await this.repository.update(id, currentUsers, data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Role updated successfully', updatedRole);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteRole(id: number) {
    try {
      if (id in [1, 2, 3]) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Cannot delete default roles');
      }
      const role = await this.repository.getByEntity({ id });
      if (!role) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Role not found');
      }
      const users = role.users.map((user) => ({ id: user.id }));
      const deletedRole = await this.repository.delete(id, users);
      return new BaseResponse(STATUS_CODE.OK, true, 'Role deleted successfully', deletedRole);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const roleService = new RoleService();
export default roleService;
