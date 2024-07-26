import React, { useState, useEffect, useRef, useCallback } from "react";
import DataGrid, {
  Column,
  Editing,
  Texts,
  Pager,
  Paging,
  FilterRow,
  RequiredRule,
  CustomRule,
  Selection
} from "devextreme-react/data-grid";
import TextBox from "devextreme-react/text-box";



import notify from "devextreme/ui/notify";
import DataSource from "devextreme/data/data_source";

const UNIQUE_ROLES_ERROR = "Please use unique role names";

var dataGrid;

const dataSource = {
  load: (loadOptions) => {
    console.log("load");
    
  }
};

const isRoleEditable = (role) => {
  return !role.IsBasic && !role.IsDefault;
};

const checkAllowEdit = (data) => isRoleEditable(data.row.data);

const Ranking = () => {
  const [selectedRoleRights, setSelectedRoleRights] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const selectedRoleRef = useRef();
  const [abc, setAbc] = useState("some text");
  // const [selectedRoleUserNr, setSelectedRoleUserNr] = useState(roleUserNr);
  // const [roles, setRoles] = useState(dummyRoles);
  // const [rights, setRights] = useState(dummyRights);
  // const [isError, setIsError] = useState(false);
  const [areRightDisabled, setAreRightsDisabled] = useState(false);

  // const buildRolePrivileges = (selectedRole) => {
  //   setSelectedRoleRights(
  //     rights.map((right) => ({
  //       ...right,
  //       Active: !!selectedRole.Rights.some((r) => r.Id == right.Id)
  //     }))
  //   );
  // };

  // const updateRolesRights = async (right, isActive) => {
  //   const newRole = {
  //     ...selectedRole,
  //     Rights: isActive
  //       ? [...selectedRole.Rights, right]
  //       : selectedRole.Rights.filter((right) => right.Id !== right.Id)
  //   };

  //   let rightEnumList = newRole.Rights.map((a) => a.Id);
  //   // await httpUtils.postRequest(
  //   //   "/api/helper/UpdateRights/" + selectedRole.Id,
  //   //   rightEnumList
  //   // );

  //   notify("Change saved...", "success", 600);
  // };

  // const isRoleNameDuplicate = (roleData) => {
  //   return dataSourceRole
  //     .items()
  //     .find((role) => role.Name === roleData.Name && role.Id !== roleData.Id);
  // };

  // const removeRole = (roleId) => {
  //   const newRoles = roles.filter((role) => role.Id !== roleId);

  //   setRoles(newRoles);

  //   if (selectedRole.Id === roleId) {
  //     setCurrentRole(roles[0]);
  //   }
  // };

  // const onInitNewRow = () => setAreRightsDisabled(true);

  // const onRowInserted = () => setAreRightsDisabled(false);

  // const onEditCanceled = () => setAreRightsDisabled(false);

  const onInitialized = (e) => {
    //based on https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/DeferredSelection/React/Light/
    dataGrid = e.component;
  };

  const onSelectionChange = (data) => {
    dataGrid.getSelectedRowsData().then((rowData) => {
      if (!rowData[0]) {
        return;
      }
      setCurrentRole(rowData[0]);
    });
  };

  const setCurrentRole = (role) => {
    // selectedRoleRef.current = role;
    setAbc(role.CompanyName);
    setSelectedRole(role);
    // buildRolePrivileges(role);
  };

  // const getRights = async () => {
  //   const response = await httpUtils.getRequest("/odata/rights");
  //   setRights(response.data.value);
  // };

  // useEffect(() => {
  //   getRights();
  // }, []);

  // useEffect(() => {
  //   buildRolePrivileges(selectedRole);
  // }, [rights]);

  // useEffect(() => {
  //   //GET NR OF USERS WITH GIVEN ROLE
  //   //setSelectedRoleUserNr()
  // }, [selectedRoleRights]);

  return (
    <React.Fragment>
      {/* <h2 className={"content-block"}>Role Detail</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}> */}
      <DataGrid
        dataSource={dataSource}
        hoverStateEnabled={true}
        onSelectionChanged={onSelectionChange}
        // onInitNewRow={onInitNewRow}
        // onRowInserted={onRowInserted}
        // onEditCanceled={onEditCanceled}
        onInitialized={onInitialized}
        // onRowRemoved={(data) => removeRole(data?.data.Id)}
        // onRowUpdated={(data) => onRoleEdit(data?.data)}
        //selectedRowKeys={selectedRole || roles[0]}
        // columnHidingEnabled={true}
      >
        <Selection mode="single" deferred={true} repaintChangesOnly={true} />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <Editing
          mode="inline"
          refreshMode="reshape"
          allowDeleting={checkAllowEdit}
          allowAdding={true}
          allowUpdating={checkAllowEdit}
          useIcons={true}
        >
          {/* <Texts
                confirmDeleteMessage={`${selectedRoleUserNr} users are assigned and will be transferred to role "standard user"`}
              /> */}
        </Editing>
        {/* <Column dataField="ID">
              <RequiredRule />
              <CustomRule
                type="custom"
                message={UNIQUE_ROLES_ERROR}
                validationCallback={(data) => !isRoleNameDuplicate(data.data)}
              />
            </Column>
            <Column dataField="CompanyName">
              <RequiredRule />
            </Column> */}
      </DataGrid>
      <TextBox placeholder="Enter full name here..." value={abc} />
      {/* </div>
      </div> */}
      {/* <h2 className={"content-block"}>{`Privileges ${
        selectedRole.Name ? `for ${selectedRole.Name}` : ""
      }`}</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <DataGrid
            hoverStateEnabled={true}
            dataSource={dataSource}
            onRowUpdating={(data) =>
              updateRolesRights(data.oldData, data.newData.Active)
            }
            disabled={areRightDisabled}
          >
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector={true} showInfo={true} />
            <FilterRow visible={true} />
            <Editing
              mode="cell"
              refreshMode="reshape"
              allowUpdating={isRoleEditable(selectedRole)}
            >
              <Texts confirmDeleteMessage="Are you sure you want to remove privilege?" />
            </Editing>
            <Column
              dataField="Name"
              caption="Privilege Name"
              allowEditing={false}
            />
            <Column
              dataField="Description"
              caption="Short Description"
              allowEditing={false}
            />
            <Column dataField="Active" caption="Active" width={125} />
          </DataGrid>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Ranking;
