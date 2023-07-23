const successCode = (res: any, data: any, message: string, status: number) => {
  res.status(200).json({
    message,
    content: data,
    statusCode: status,
  });
};

export { successCode };
