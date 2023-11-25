import { httpClient } from '@/adapters/httpClient';
import { AuditingTransformer, PaginatedResponse, PaginationDto } from '@/domain/common';
import { Client, ClientDto } from '.';
import { produce } from 'immer';

export class ClientService {
  private static resource = '/authorization';

  static async listAll({ page, limit }: PaginationDto): Promise<PaginatedResponse<Client>> {
    const response = await httpClient.get<PaginatedResponse<Client>>(`${ClientService.resource}/client`, {
      params: {
        page,
        limit,
      },
    });

    return produce(response.data, (draft) => {
      draft.results = draft.results.map((item) => AuditingTransformer.toAuditing(item));
    });
  }

  static async create(payload: ClientDto): Promise<void> {
    await httpClient.post(`${ClientService.resource}/client`, payload);
  }

  static async update(id: string, payload: ClientDto): Promise<void> {
    await httpClient.put(`${ClientService.resource}/client/${id}`, payload);
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete(`${ClientService.resource}/client/${id}`);
  }

  static async updateStatus(id: string, active: boolean) {
    await httpClient.patch(`${ClientService.resource}/client/${id}`, { active });
  }
}
