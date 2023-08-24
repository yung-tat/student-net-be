export const errorResponse = (status: number, error: string, data?: any) => ({
  status,
  error,
  data,
});

export const successResponse = (
  status: number,
  success: string,
  data?: any,
) => ({
  status,
  success,
  data,
});
