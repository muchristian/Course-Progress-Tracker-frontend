import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Registra from "./Screen/Registra";

import UserTable from "./Screen/user/Table";
import UserReg from "./Screen/user/Register";
import CourseTable from "./Screen/course/RegistraTable";
import CourseReg from "./Screen/course/Register";
import CourseDetail from "./Screen/course/Detail";
import FacultyTable from "./Screen/Faculty/Table";
import DepartmentTable from "./Screen/Department/Table";
import AttendanceTable from "./Screen/Attendance/Table";
import CourseReport from "./Screen/course/courseReport";
import CourseTableById from "./Screen/course/TeacherTable";
import Wrapper from "./wrapper";
import { connect } from "react-redux";
import RepresenterTable from "./Screen/course/RepresenterTable";
import Semester from "./Screen/semester/Table";

function DashLayout({ isLoggedIn, match }) {
  const routeData =
    isLoggedIn === "ADMIN"
      ? [
          {
            path: "/",
            exact: true,
            main: () => <UserTable />,
          },
          {
            path: `/user-add`,
            main: () => <UserReg />,
          },
        ]
      : isLoggedIn === "REGISTRA"
      ? [
          {
            path: "/",
            exact: true,
            main: () => <UserTable />,
          },
          {
            path: `/user-add`,
            main: () => <UserReg />,
          },
          {
            path: `/courses`,
            main: () => <CourseTable />,
          },
          {
            path: `/course/:id`,
            main: () => <CourseDetail />,
          },
          {
            path: `/faculties`,
            main: () => <FacultyTable />,
          },
          {
            path: `/departments`,
            main: () => <DepartmentTable />,
          },
          {
            path: `/semester`,
            main: () => <Semester />,
          },
        ]
      : isLoggedIn === "DEAN"
      ? [
          {
            path: "/",
            exact: true,
            main: () => <CourseReport />,
          },
          {
            path: "/teachers",
            main: () => <UserTable />,
          },
          {
            path: `/user-add`,
            main: () => <UserReg />,
          },
          {
            path: `/courses`,
            exact: true,
            main: () => <CourseTable />,
          },
          {
            path: `/course/:id`,
            main: () => <CourseDetail />,
          },
          {
            path: `/course-add`,
            main: () => <CourseReg />,
          },
        ]
      : isLoggedIn === "TEACHER"
      ? [
          {
            path: `/`,
            exact: true,
            main: () => <CourseTableById />,
          },
          {
            path: `/course-detail/:id`,
            main: () => <CourseDetail />,
          },
          {
            path: `/course/:id/update`,
            main: () => <CourseReg />,
          },
          {
            path: `/user-add`,
            main: () => <UserReg />,
          },
        ]
      : [
          {
            path: `/`,
            main: () => <RepresenterTable />,
          },
          {
            path: `/course/:id`,
            main: () => <CourseDetail />,
          },
        ];
  // : isLoggedIn === 'DEAN'
  // ? [
  //     // {
  //     //   path: `/users`,
  //     //   main: () => <UserTable />,
  //     // },
  //     {
  //       path: `/`,
  //       exact: true,
  //       main: () => <CourseTable />,
  //     },
  //     {
  //       path: `/course/:id`,
  //       main: () => <CourseDetail />,
  //     },
  //     {
  //       path: `/course-add`,
  //       main: () => <CourseReg />,
  //     },
  //     // {
  //     //   path: `/faculty-add`,
  //     //   main: () => <FacultyReg />,
  //     // },
  //     // {
  //     //   path: `/faculty-add`,
  //     //   main: () => <FacultyReg />,
  //     // },
  //   ] : [
  //       // {
  //       //   path: `/users`,
  //       //   main: () => <UserTable />,
  //       // },
  //       {
  //         path: `/`,
  //         exact: true,
  //         main: () => <CourseTable />,
  //       },
  //       {
  //         path: `/course/:id`,
  //         main: () => <CourseDetail />,
  //       },

  //       // {
  //       //   path: `/faculty-add`,
  //       //   main: () => <FacultyReg />,
  //       // },
  //       // {
  //       //   path: `/faculty-add`,
  //       //   main: () => <FacultyReg />,
  //       // },
  //     ];
  const [routes, setroutes] = useState(routeData);
  return (
    <Wrapper>
      {routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.main />}
        />
      ))}
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default withRouter(connect(mapStateToProps)(DashLayout));
