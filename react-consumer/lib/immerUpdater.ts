import produce from 'immer';

export function immerUpdater<S>(s: S, fn: (state: S) => any) {
  return produce(s, (d: any) => {
    fn(d);
  });
}

export default immerUpdater;
