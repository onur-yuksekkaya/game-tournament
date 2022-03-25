import React from "react";
import { useNavigate } from "react-router";

import AddForm from "../components/AddForm";
import Button from "../components/Button";

import PageContent from "../layouts/PageContent";
import PageHeader from "../layouts/PageHeader";
import PageLayout from "../layouts/PageLayout";

import "./AddPage.style.scss";

const AddPage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <PageHeader>
        <Button
          text="Go Back"
          variant="goback"
          onClick={() => {
            navigate("/");
          }}
        />
      </PageHeader>
      <PageContent>
        <div className="add-page__form">
          <h3 className="add-page__form__heading">Add New Nominee</h3>
          <AddForm />
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default AddPage;
