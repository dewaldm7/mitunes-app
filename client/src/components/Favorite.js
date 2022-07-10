import React from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";

function Favorite({ favoriteList, handleDelete }) {
  // const { favoriteList } = props;

  return (
    <div className="favorite">
      <Table bordered light>
        <thead className="favorites-header">
          <tr>
            <th className="favourites-text">Favorites</th>
            <th>
              <i class="fa fa-headphones" aria-hidden="true" />
            </th>
          </tr>
        </thead>
      </Table>
      <Table bordered>
        <tbody>
          <tr className="row-container">
            {favoriteList.map((item) => {
              return (
                <div>
                  <a key={item.id} href={item.link}>
                    <td className="favorite-wraper">
                      <img
                        className="favourite-image"
                        src={item.img}
                        alt={item.title}
                      />
                    </td>
                    <td className="favorite-username">{item.title}</td>
                  </a>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Favorite;
