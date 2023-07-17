const successCode = (res: any, data: any, message: string) => {
  res.status(200).json({
    message,
    content: data,
  });
};

export { successCode };
