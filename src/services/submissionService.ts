import { Submission } from '@/interfaces/submission';
import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';
import EventRepository from '@repositories/eventRepository';
import SubmissionRepository from '@repositories/submissionRepository';

class SubmissionService {
  private repository: SubmissionRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.repository = new SubmissionRepository();
    this.eventRepository = new EventRepository();
  }

  async createSubmission(data: Submission) {
    try {
      data.files = { connect: data.files };
      const submission = await this.repository.add(data as any);
      if (!submission) {
        throw new Error('create submission failed');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Submission created successfully', submission);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getSubmissionById(id: number) {
    try {
      const submission = await this.repository.getByEntity({ id }, { files: true });
      if (!submission) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Submission not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Submission found', submission);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getSubmissionsByEventKey(key: string) {
    try {
      const event = await this.eventRepository.getByEntity({ key });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const submissions = await this.repository.getManyByEntity(
        {
          Team: { accountEvents: { some: { eventID: { equals: event.id } } } },
        },
        { Team: { select: { name: true } }, createdAt: true }
      );
      if (!submissions) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Submissions not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Submissions found', submissions);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteSubmission(id: number) {
    try {
      const submission = await this.repository.getByEntity({ id });
      if (!submission) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Submission not found');
      }
      await this.repository.delete({ id });
      return new BaseResponse(STATUS_CODE.OK, true, 'Submission deleted successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const submissionService = new SubmissionService();
export default submissionService;
