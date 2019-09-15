module.exports = (ctx, data) => {
  ctx.log.info('Hello, world!')
  const result = data.x + data.y;

  return ctx.done(null, result);
};