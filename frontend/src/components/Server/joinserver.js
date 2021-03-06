import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Code = ({updateUserState}) => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeCode = (e) => {
    const code = e.target.value;
    setCode(code);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.joinServer(code).then(
        () => {
          navigate('/');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
          <h3>Join Server</h3>
        <Form onSubmit={handleCreate} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Code</label>
            <Input
              type="text"
              className="form-control"
              name="name"
              value={code}
              onChange={onChangeCode}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Join</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Code;