import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { prisma } from '../client';

export default class EventRepository {
  private model: Prisma.EventDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.event;
  }

  async add(entity: Prisma.EventCreateInput) {
    try {
      const newEvent = await this.model.create({
        data: entity,
      });
      return newEvent;
    } catch (error) {
      console.error(error);
      throw new Error('[Event Repository]: ' + error);
    }
  }

  async getAll() {
    try {
      const allEvents = await this.model.findMany();
      return allEvents;
    } catch (error) {
      console.error(error);
      throw new Error('[Event Repository]: ' + error);
    }
  }

  async getByEntity(entity: Prisma.EventWhereUniqueInput) {
    try {
      const event = await this.model.findUnique({
        where: entity,
      });
      return event;
    } catch (error) {
      console.error(error);
      throw new Error('[Event Repository]: ' + error);
    }
  }

  async update(id: number, entity: Prisma.EventUpdateInput) {
    try {
      const updatedEvent = await this.model.update({
        where: { id },
        data: entity,
      });
      return updatedEvent;
    } catch (error) {
      console.error(error);
      throw new Error('[Event Repository]: ' + error);
    }
  }

  async delete(id: number) {
    try {
      const deletedEvent = await this.model.delete({
        where: { id },
      });
      return deletedEvent;
    } catch (error) {
      console.error(error);
      throw new Error('[Event Repository]: ' + error);
    }
  }
}
