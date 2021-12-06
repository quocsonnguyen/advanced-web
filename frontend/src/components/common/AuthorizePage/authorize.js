import React, { useState, useEffect } from 'react';
import qs from 'qs'
import axios from 'axios';
import { Layout } from '../'
import { Container, Row, Col, Table } from 'react-bootstrap';
import style from './authorize.module.css'
// import authService from '../../../services/auth.service';


function Authorize(props) {
    const [user, setUser] = useState()
    const [perms,setPerms] = useState(new Array(22).fill(false))
    let _userID = { id: qs.parse(window.location.search, { ignoreQueryPrefix: true })._id }
    console.log(_userID)
    console.log(user)


    useEffect(async () => {
        let _user = await axios.get('/getUserById', JSON.stringify(_userID))
        setUser(_user)
        console.log(perms)
    },[])


    const handleOnChange = (position) => {
        const updatedPerms = perms.map((permission,index)=>
            index === position ? !permission : permission
        )
        setPerms(updatedPerms);
    }
    

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <h2>Username</h2>
                        <h2>User Falculty</h2>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className={style.authorize_table_col1}>Phòng Khoa</th>
                                <th className={style.authorize_table_col2}>Cấp Quyền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Index 0 */}
                            <tr> 
                                <td>Phòng Công tác học sinh sinh viên (CTHSSV)</td>
                                <td><input type="checkbox" id="" name="cthssv" value="cthssv" checked={perms[0]} onChange={()=>handleOnChange(0)}/></td>
                            </tr>
                            {/* Index 1 */}
                            <tr>
                                <td>Phòng Đại học</td>
                                <td><input type="checkbox" id="" name="pdh" value="pdh" checked={perms[1]} onChange={()=>handleOnChange(1)}/></td>
                            </tr>
                            {/* Index 2 */}
                            <tr>
                                <td>Phòng Sau đại học</td>
                                <td><input type="checkbox" id="" name="psdh" value="psdh" checked={perms[2]} onChange={()=>handleOnChange(2)}/></td>
                            </tr>
                            {/* Index 3 */}
                            <tr>
                                <td>Phòng điện toán và máy tính</td>
                                <td><input type="checkbox" id="" name="pdtmt" value="pdtmt" checked={perms[3]} onChange={()=>handleOnChange(3)}/></td>
                            </tr>
                            {/* Index 4 */}
                            <tr>
                                <td>Phòng khảo thí và kiểm định chất lượng</td>
                                <td><input type="checkbox" id="" name="pktkd" value="pktkd" checked={perms[4]} onChange={()=>handleOnChange(4)}/></td>
                            </tr>
                            {/* Index 5 */}
                            <tr>
                                <td>Phòng tài chính</td>
                                <td><input type="checkbox" id="" name="ptc" value="ptc" checked={perms[5]} onChange={()=>handleOnChange(5)}/></td>
                            </tr>
                            {/* Index 6 */}
                            <tr>
                                <td>TDT Creative Language Center</td>
                                <td><input type="checkbox" id="" name="clc" value="clc" checked={perms[6]} onChange={()=>handleOnChange(6)}/></td>
                            </tr>
                            {/* Index 7 */}
                            <tr>
                                <td>Trung tâm tin học</td>
                                <td><input type="checkbox" id="" name="ttth" value="ttth" checked={perms[7]} onChange={()=>handleOnChange(7)}/></td>
                            </tr>
                            {/* Index 8 */}
                            <tr>
                                <td>Trung tâm đào tạo phát triển xã hội (SDTC)</td>
                                <td><input type="checkbox" id="" name="sdtc" value="sdtc" checked={perms[8]} onChange={()=>handleOnChange(8)}/></td>
                            </tr>
                            {/* Index 9 */}
                            <tr>
                                <td>Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)</td>
                                <td><input type="checkbox" id="" name="atem" value="atem" checked={perms[9]} onChange={()=>handleOnChange(9)}/></td>
                            </tr>
                            {/* Index 10 */}
                            <tr>
                                <td>Trung tâm hợp tác doanh nghiệp và cựu sinh viên</td>
                                <td><input type="checkbox" id="" name="htdn" value="htdn" checked={perms[10]} onChange={()=>handleOnChange(10)}/></td>
                            </tr>
                            {/* Index 11 */}
                            <tr>
                                <td>Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa</td>
                                <td><input type="checkbox" id="" name="nnttvh" value="nnttvh" checked={perms[11]} onChange={()=>handleOnChange(11)}/></td>
                            </tr>
                            {/* Index 12 */}
                            <tr>
                                <td>Viện chính sách kinh tế và kinh doanh</td>
                                <td><input type="checkbox" id="" name="csktkd" value="csktkd" checked={perms[12]} onChange={()=>handleOnChange(12)}/></td>
                            </tr>
                            {/* Index 13 */}
                            <tr>
                                <td>Khoa Luật</td>
                                <td><input type="checkbox" id="" name="kl" value="kl" checked={perms[13]} onChange={()=>handleOnChange(13)}/></td>
                            </tr>
                            {/* Index 14 */}
                            <tr>
                                <td>Khoa Mỹ thuật công nghiệp</td>
                                <td><input type="checkbox" id="" name="kmtcn" value="kmtcn" checked={perms[14]} onChange={()=>handleOnChange(14)}/></td>
                            </tr>
                            {/* Index 15 */}
                            <tr>
                                <td>Khoa Điện – Điện tử</td>
                                <td><input type="checkbox" id="" name="kdt" value="kdt" checked={perms[15]} onChange={()=>handleOnChange(15)}/></td>
                            </tr>
                            {/* Index 16 */}
                            <tr>
                                <td>Khoa Công nghệ thông tin</td>
                                <td><input type="checkbox" id="" name="kcntt" value="kcntt" checked={perms[16]} onChange={()=>handleOnChange(16)}/></td>
                            </tr>
                            {/* Index 17 */}
                            <tr>
                                <td>Khoa Quản trị kinh doanh</td>
                                <td><input type="checkbox" id="" name="kqtkd" value="kqtkd" checked={perms[17]} onChange={()=>handleOnChange(17)}/></td>
                            </tr>
                            {/* Index 18 */}
                            <tr>
                                <td>Khoa Môi trường và bảo hộ lao động</td>
                                <td><input type="checkbox" id="" name="kmtbh" value="kmtbh" checked={perms[18]} onChange={()=>handleOnChange(18)}/></td>
                            </tr>
                            {/* Index 19 */}
                            <tr>
                                <td>Khoa Lao động công đoàn</td>
                                <td><input type="checkbox" id="" name="kldcd" value="kldcd" checked={perms[19]} onChange={()=>handleOnChange(19)}/></td>
                            </tr>
                            {/* Index 20 */}
                            <tr>
                                <td>Khoa Tài chính ngân hàng</td>
                                <td><input type="checkbox" id="" name="ktcnh" value="ktcnh" checked={perms[20]} onChange={()=>handleOnChange(20)}/></td>
                            </tr>
                            {/* Index 21 */}
                            <tr>
                                <td>Khoa giáo dục quốc tế</td>
                                <td><input type="checkbox" id="" name="kgdqt" value="kgdqt" checked={perms[21]} onChange={()=>handleOnChange(21)}/></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Layout>
    )
}

export default Authorize
