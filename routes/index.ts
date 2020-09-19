export function indexHandler(req: any, res: any, next: any) {
  res.render('index', { bodyContents: 'Templatized body contents' });
};
