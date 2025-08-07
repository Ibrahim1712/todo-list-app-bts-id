import HttpClient from "./httpClient";
import type { APIResponse } from "@/types/api";
import type {
  Checklist,
  ChecklistItem,
  CreateChecklistRequest,
  CreateChecklistItemRequest,
  UpdateChecklistItemRequest,
} from "@/types/checklist";

class ChecklistService {
  private checklistClient: HttpClient<Checklist[]>;
  private checklistItemClient: HttpClient<ChecklistItem[]>;

  constructor() {
    this.checklistClient = new HttpClient<Checklist[]>("/checklist");
    this.checklistItemClient = new HttpClient<ChecklistItem[]>("/checklist");
  }

  // Checklist operations
  getAllChecklists = (): Promise<APIResponse<Checklist[]>> => {
    return this.checklistClient.getAll();
  };

  createChecklist = (
    data: CreateChecklistRequest
  ): Promise<APIResponse<Checklist>> => {
    return this.checklistClient.axiosInstance
      .post<APIResponse<Checklist>>("/checklist", data)
      .then((res) => res.data);
  };

  deleteChecklist = (checklistId: number): Promise<void> => {
    return this.checklistClient.axiosInstance
      .delete(`/checklist/${checklistId}`)
      .then((res) => res.data);
  };

  // Checklist Item operations
  getChecklistItems = (
    checklistId: number
  ): Promise<APIResponse<ChecklistItem[]>> => {
    return this.checklistItemClient.axiosInstance
      .get<APIResponse<ChecklistItem[]>>(`/checklist/${checklistId}/item`)
      .then((res) => res.data);
  };

  createChecklistItem = (
    checklistId: number,
    data: CreateChecklistItemRequest
  ): Promise<APIResponse<ChecklistItem>> => {
    return this.checklistItemClient.axiosInstance
      .post<APIResponse<ChecklistItem>>(`/checklist/${checklistId}/item`, data)
      .then((res) => res.data);
  };

  getChecklistItem = (
    checklistId: number,
    checklistItemId: number
  ): Promise<APIResponse<ChecklistItem>> => {
    return this.checklistItemClient.axiosInstance
      .get<APIResponse<ChecklistItem>>(
        `/checklist/${checklistId}/item/${checklistItemId}`
      )
      .then((res) => res.data);
  };

  updateChecklistItemStatus = (
    checklistId: number,
    checklistItemId: number
  ): Promise<APIResponse<ChecklistItem>> => {
    return this.checklistItemClient.axiosInstance
      .put<APIResponse<ChecklistItem>>(
        `/checklist/${checklistId}/item/${checklistItemId}`
      )
      .then((res) => res.data);
  };

  renameChecklistItem = (
    checklistId: number,
    checklistItemId: number,
    data: UpdateChecklistItemRequest
  ): Promise<APIResponse<ChecklistItem>> => {
    return this.checklistItemClient.axiosInstance
      .put<APIResponse<ChecklistItem>>(
        `/checklist/${checklistId}/item/rename/${checklistItemId}`,
        data
      )
      .then((res) => res.data);
  };

  deleteChecklistItem = (
    checklistId: number,
    checklistItemId: number
  ): Promise<void> => {
    return this.checklistItemClient.axiosInstance
      .delete(`/checklist/${checklistId}/item/${checklistItemId}`)
      .then((res) => res.data);
  };
}

export const checklistService = new ChecklistService();
