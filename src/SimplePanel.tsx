import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import Circle from './Circle';

interface Props extends PanelProps<SimpleOptions> {}
declare global {
  interface Array<T> {
    contains(o: T): T[];
  }
}
export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  const array: any = data.series[0].fields[1].values;
  const array2: any = data.series[1].fields[1].values.toArray();
  let uniqueList: any = [];
  let dupList: any = [];
  var a: any = array.map((item: any, index: any) => {
    return {
      id: index,
      nameLog: item,
      status: [array2[index]],
    };
  });

  // function contains(list: any, item: any): any {
  //   let filtered_item = list.filter((i:any) => {
  //     return i.id === item.id;
  //   });
  //   return !!filtered_item.length;
  // }

  function pushToUniqueList(item: any) {
    if (!uniqueList.contains(item)) {
      uniqueList.push(item);
    }
  }

  function pushToDuplicateList(item: any) {
    if (!dupList.contains(item)) {
      dupList.push(item);
    }
  }

  Array.prototype.contains = function(item: any): any {
    let filtered_item = this.filter(i => {
      return i.nameLog === item.nameLog;
    });
    return !!filtered_item.length;
  };

  for (let i = 0; i < a.length; i++) {
    if (uniqueList.contains(a[i])) {
      pushToDuplicateList(a[i]);
    } else {
      pushToUniqueList(a[i]);
    }
  }


  const lookup:any = a.reduce((a:any, e:any) => {
    a[e.nameLog] = ++a[e.nameLog] | 0;
    return a;
  }, {});
  
  var dupListnew:any = a.filter((e:any) => lookup[e.nameLog]);
  
  
  for(i of uniqueList){
    for(e of dupListnew){
      if(i.nameLog === e.nameLog){
        i.status=[...i.status,e.status[0]]
      }
    }
  }


  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <table>
        <tr>
          {console.log(uniqueList)}
          {uniqueList.map((e: any) => (
            <div
              className={cx(
                styles.wrapper,
                css`
                  display: inline;
                `
              )}
            >
              <td>{e.nameLog}</td>
              <td>
                <Circle data={e.status} />
              </td>
              <br />
            </div>
          ))}
        </tr>
      </table>
      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
