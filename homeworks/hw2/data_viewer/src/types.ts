export interface Recipe {
  id: string;
  query: string;
  response: string;
  dietary_restriction?: string;
  success?: boolean;
  error?: string;
  trace_id?: string;
  query_id?: string;
}