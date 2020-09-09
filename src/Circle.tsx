import React, { ReactElement } from 'react';

interface Props {
  data: [];
}

export default function Circle(props: Props): ReactElement {
  const { data } = props;
  return (
    <div>
      {data.map((e: any, i: any) => (
        <svg key={i} height="10" width="10">
          <circle cx="5" cy="5" r="4" fill={e === 0 ? 'green' : 'red'} />
        </svg>
      ))}
    </div>
  );
}
